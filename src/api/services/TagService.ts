import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Tag } from '../models/Tag';
import { TagRepository } from '../repositories/TagRepository';
import { events } from '../subscribers/events';
import { Dish } from '../models/Dish';

@Service()
export class TagService {

    constructor(
        @OrmRepository() private tagRepository: TagRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<Tag[]> {
        this.log.info('Find all tags');
        return this.tagRepository.find();
    }

    public findByDish(dish: Dish): Promise<Tag> {
        this.log.info('Find the tag of the dish', dish.toString());
        return this.tagRepository.findOne({
            where: {
                id: dish.tag_id,
            },
        });
    }

    public findOne(id: number): Promise<Tag | undefined> {
        this.log.info('Find a tag');
        return this.tagRepository.findOne({ id });
    }

    public async create(tag: Tag): Promise<Tag> {
        this.log.info('Create a new tag => ', tag.toString());
        const newTag = await this.tagRepository.save(tag);
        this.eventDispatcher.dispatch(events.tag.created, newTag);
        return newTag;
    }

    public update(id: number, tag: Tag): Promise<Tag> {
        this.log.info('Update a tag');
        tag.id = id;
        return this.tagRepository.save(tag);
    }

    public delete(id: number): Promise<void> {
        this.log.info('Delete a pet');
        return this.tagRepository.removeById(id);
    }

}
