import { Service } from 'typedi';
import axios from 'axios';
import * as _ from 'lodash';
import * as request from 'request-promise';
import * as cheerio from 'cheerio';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Restaurant } from '../models/Restaurant';
import { Category } from '../models/Category';
import { Integration } from '../models/Integration';
import { getConnection, QueryRunner } from 'typeorm';
import { Dish } from '../models/Dish';
import { Tag } from '../models/Tag';

@Service()
export class FoodyService {
    private REQUEST_COUNT = 1000;
    private SORT_TYPE = 2; // By total orders
    private HEADER_KEY = 'X-Requested-With';
    private HEADER_VALUE = 'XMLHttpRequest';
    private INTEGRATION_SOURCE = 'foody.vn';
    private FOODY_URL = 'https://www.foody.vn/__get/Delivery/GetDeliveryDishes';
    // private RESTAURANT_ID_PATTERN = /micrositeRestaurantId = (.*);/;
    // private RESTAURANT_NAME_PATTERN = /"RestaurantName":"(.*)","RestaurantAddress"/;
    // private RESTAURANT_ADDRESS_PATTERN = /"RestaurantAddress":"(.*)","DistanceLimit"/;
    constructor(
        // @OrmRepository() private restaurantRepository: RestaurantRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async retrieveRestaurantByURL(url: string): Promise<number> {
        const options = {
            url,
            headers: {
                'User-Agent': 'request'
            }
        };
        const queryRunner = getConnection().createQueryRunner();
        const result = await request(options);
        const body = result as string;
        const $ = cheerio.load(body);

        const restaurantDataScript = $('.microsite-basic-info > script')[0];
        let scriptData = restaurantDataScript.children[0].data.trim();
        let restaurantData = scriptData.match(/var initResData = ([\s\S]*?)}};/)[1];
        const basicParsed = JSON.parse(`${restaurantData}}}`.replace('RestaurantData', '"RestaurantData"'));

        let restaurant = new Restaurant();
        restaurant.name = basicParsed.RestaurantData.RestaurantName;
        restaurant.location = basicParsed.RestaurantData.RestaurantAddress;

        const restaurantMenuScript = $('.micro-main-menu').next('script');
        scriptData = restaurantMenuScript[0].children[0].data.trim();
        restaurantData = scriptData.match(/var initData = ([\s\S]*?)};/)[1];
        restaurantData = `${restaurantData}}`
            .replace(/\'/g, '"')
            .replace('RestaurantId', '"RestaurantId"')
            .replace('OrderDish', '"OrderDish"')
            .replace('Districts', '"Districts"')
            .replace('GroupDishes', '"GroupDishes"')
            .replace('SmsConfirmFee', '"SmsConfirmFee"')
            .replace('CallConfirmFee', '"CallConfirmFee"')
            .replace('IsDeliveryInvoice:', '"IsDeliveryInvoice":')
            .replace('DeliveryInvoice:', '"DeliveryInvoice":')
            .replace('CurrencyUnit', '"CurrencyUnit"')
            .replace('ResBusy: null,', '"ResBusy": null');
        const parsed = JSON.parse(restaurantData);
        const foodyId = parsed.RestaurantId;

        const category = new Category();
        category.category = $('.kind-restaurant').text().trim();
        restaurant.image_source = $('.pic-place').attr('src').trim();

        this.log.info('Finish pulling foody data');
        this.log.info('Start transaction');
        try {
            const integration = await queryRunner.manager.findOne(Integration, {
                where: {
                    source_id: foodyId,
                    type: 'restaurant',
                    source: this.INTEGRATION_SOURCE,
                }
            });
            if (integration) {
                this.log.info('__Integration Found ', integration);
                return integration.source_id;
            }

            await queryRunner.startTransaction();
            let createdCategory = await queryRunner.manager.findOne(Category, {
                category: category.category
            });
            if (!createdCategory) {
                createdCategory = await queryRunner.manager.save(category);
                this.log.info('__Created Category ', createdCategory);
            }
            restaurant.category = createdCategory;

            let createdIntegration = new Integration();
            createdIntegration.type = 'restaurant';
            createdIntegration.source = this.INTEGRATION_SOURCE;
            createdIntegration.source_id = foodyId;
            createdIntegration = await queryRunner.manager.save(createdIntegration);

            restaurant.integration = createdIntegration;
            restaurant = await queryRunner.manager.save(restaurant);
            this.log.info('__Created Restaurant ', restaurant);

            await this.parseDishesToDishModel(restaurant, parsed, queryRunner);

            this.log.info('Finish Create Tag/Dish/Integration ');
            await queryRunner.commitTransaction();
            return foodyId;
        } catch (err) {
            this.log.error('Error occured: ', err);
            await queryRunner.rollbackTransaction();
            return undefined;
        }
    }

    public async parseDishesToDishModel(restaurant: Restaurant, obj: any, queryRunner: QueryRunner): Promise<void> {

        this.log.info('Starting Dish Parsing: ');
        const groupDishes = obj.GroupDishes;
        try {
            groupDishes.map(async tag => {
                let newTag = new Tag();
                newTag.tag = tag.Name;
                newTag = await queryRunner.manager.save(newTag);
                this.log.info('__Generate Tag: ', newTag.tag);
                const dishArray = await tag.DeliDishes.DeliDishItem.map(dish => {
                    const newDish = new Dish();
                    newDish.name = dish.Name;
                    newDish.description = dish.Description;
                    newDish.tag = newTag;
                    newDish.image_source = dish.Photo.Img[3] ? dish.Photo.Img[3].Url
                        : dish.Photo.Img[2] ? dish.Photo.Img[2].Url
                            : dish.Photo.Img[1] ? dish.Photo.Img[1].Url
                                : dish.Photo.Img[0].Url;
                    newDish.restaurant_id = restaurant.id;
                    newDish.price = dish.Price.Value;
                    newDish.discount_price = dish.DiscountPrice;
                    const newIntegration = new Integration();
                    newIntegration.source_id = dish.Id;
                    newIntegration.source = this.INTEGRATION_SOURCE;
                    newIntegration.type = 'dish';
                    newIntegration.dish = newDish;
                    newDish.integration = newIntegration;

                    this.log.info('__/__Generate Dish: ', `${newDish.integration.source_id} ${newDish.name}`);
                    return newDish;
                });
                await queryRunner.manager.save(dishArray);
                newTag.dishes = dishArray;
                return newTag;
            });
            this.log.info('Finish generating dishes model');
        } catch (err) {
            this.log.error('Dish error occured: ', err);
            await queryRunner.rollbackTransaction();
        }
    }

    public async updateDishesByRestaurantId(restaurantId: number): Promise<any[]> {
        const queryRunner = getConnection().createQueryRunner();
        const restaurant = await queryRunner.manager.findOne(Restaurant, {
            where: {
                id: restaurantId
            },
            relations: ['integration', 'dishes', 'dishes.integration']
        });
        this.log.info('Start update all dishes of the restaurants: ', restaurant.name);
        return axios({
            method: 'get',
            url: this.FOODY_URL,
            headers: { [this.HEADER_KEY]: this.HEADER_VALUE },
            params: {
                restaurantId: restaurant.integration.source_id,
                requestCount: this.REQUEST_COUNT,
                sortType: this.SORT_TYPE
            },
            responseType: 'json'
        }).then(response => {
            return this.updatePrices(restaurant, response.data, queryRunner);
        }).catch(err => {
            this.log.error('Problem occured when pulling Foody API');
            return [];
        }) as Promise<any[]>;
    }

    private async updatePrices(restaurant: Restaurant, obj: any, queryRunner: QueryRunner): Promise<any> {
        let dishArray = [];
        const dbArray = restaurant.dishes;
        const foodyArray = obj.Dishes.Items;
        await queryRunner.startTransaction();
        try {
            dishArray = foodyArray.map(item => {
                const temp = dbArray.find(res => res.integration.source_id === item.Id);
                if (temp) {
                    temp.price = item.Price;
                    temp.discount_price = item.DiscountPrice;
                    this.log.info('__/Update Dish: ', `${temp.integration.source_id} ${temp.name}`);
                } else {
                    this.log.info('__/Not Found Dish: ', `${item.Id} ${item.Name}`);
                }
                return temp;
            });
            dishArray = _.compact(dishArray);
            this.log.info('Finish update dishes model');
            dishArray = await queryRunner.manager.save(dishArray);
            await queryRunner.commitTransaction();
        } catch (err) {
            this.log.error('Problem occured when update dishes: ', err);
            await queryRunner.rollbackTransaction();
        }
        return dishArray;
    }
}
