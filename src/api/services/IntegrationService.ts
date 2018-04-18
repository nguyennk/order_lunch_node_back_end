import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Integration } from '../models/Integration';
import { IntegrationRepository } from '../repositories/IntegrationRepository';
import { events } from '../subscribers/events';
import { Restaurant } from '../models/Restaurant';

@Service()
export class IntegrationService {

    constructor(
        @OrmRepository() private integrationRepository: IntegrationRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<Integration[]> {
        this.log.info('Find all integrations');
        return this.integrationRepository.find();
    }

    public findAllRestaurantIntegrations(): Promise<Integration[]> {
        this.log.info('Find all restaurant integrations');
        return this.integrationRepository.find({
            where: {
                type: 'restaurant'
            },
        });
    }

    public findAllDishIntegrations(): Promise<Integration[]> {
        this.log.info('Find all dish integrations');
        return this.integrationRepository.find({
            where: {
                type: 'dish'
            },
        });
    }

    public findByRestaurant(restaurant: Restaurant): Promise<Integration> {
        this.log.info('Find the integration of the restaurant', restaurant.toString());
        return this.integrationRepository.findOne({
            where: {
                id: restaurant.integration_id,
                type: 'restaurant'
            },
        });
    }

    public findOne(id?: number): Promise<Integration | undefined> {
        this.log.info('Find an integration');
        return this.integrationRepository.findOne({ id });
    }

    public async create(integration: Integration): Promise<Integration> {
        this.log.info('Create a new Integration => ', integration.toString());
        const newIntegration = await this.integrationRepository.save(integration);
        this.eventDispatcher.dispatch(events.integration.created, newIntegration);
        return newIntegration;
    }

    public async delete(id: number): Promise<void | Integration> {
        this.log.info('Delete a Integration');
        return this.integrationRepository.removeById(id);
    }

}
