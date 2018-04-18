import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Category } from '../models/Category';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { events } from '../subscribers/events';

@Service()
export class CategoryService {

    constructor(
        @OrmRepository() private categoryRepository: CategoryRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<Category[]> {
        this.log.info('Find all categories');
        return this.categoryRepository.find();
    }

    public findOne(id: number): Promise<Category | undefined> {
        this.log.info('Find a category');
        return this.categoryRepository.findOne({ id });
    }

    public async create(category: Category): Promise<Category> {
        this.log.info('Create a new category => ', category.toString());
        const newCategory = await this.categoryRepository.save(category);
        this.eventDispatcher.dispatch(events.category.created, newCategory);
        return newCategory;
    }

    public update(id: number, category: Category): Promise<Category> {
        this.log.info('Update a category');
        category.id = id;
        return this.categoryRepository.save(category);
    }

    public delete(id: number): Promise<void> {
        this.log.info('Delete a category');
        return this.categoryRepository.removeById(id);
    }

}
