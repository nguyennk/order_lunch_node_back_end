import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Image } from '../models/Image';
import { ImageRepository } from '../repositories/ImageRepository';
import { events } from '../subscribers/events';
import { Restaurant } from '../models/Restaurant';
import { Dish } from '../models/Dish';

@Service()
export class ImageService {

    constructor(
        @OrmRepository() private imageRepository: ImageRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<Image[]> {
        this.log.info('Find all images');
        return this.imageRepository.find();
    }

    public findByDish(dish: Dish): Promise<Image> {
        this.log.info('Find the image of the Dish', dish.toString());
        return this.imageRepository.findOne({
            where: {
                id: dish.image_id,
            },
        });
    }

    public findByRestaurant(restaurant: Restaurant): Promise<Image> {
        this.log.info('Find the image of the restaurant', restaurant.toString());
        return this.imageRepository.findOne({
            where: {
                id: restaurant.image_id,
            },
        });
    }

    public findOne(id: number): Promise<Image | undefined> {
        this.log.info('Find an image');
        return this.imageRepository.findOne({ id });
    }

    public async create(image: Image): Promise<Image> {
        this.log.info('Create a new image => ', image.toString());
        const newImage = await this.imageRepository.save(image);
        this.eventDispatcher.dispatch(events.image.created, newImage);
        return newImage;
    }

    public update(id: number, image: Image): Promise<Image> {
        this.log.info('Update an image');
        image.id = id;
        return this.imageRepository.save(image);
    }

    public delete(id: number): Promise<void> {
        this.log.info('Delete an image');
        return this.imageRepository.removeById(id);
    }

}
