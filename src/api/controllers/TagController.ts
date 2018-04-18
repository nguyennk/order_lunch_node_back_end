import {
    Authorized, Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put
} from 'routing-controllers';

import { TagNotFoundError } from '../errors/TagNotFoundError';
import { Tag } from '../models/Tag';
import { TagService } from '../services/TagService';

@Authorized()
@JsonController('/tags')
export class TagController {

    constructor(
        private tagService: TagService
    ) { }

    @Get()
    public find(): Promise<Tag[]> {
        return this.tagService.find();
    }

    @Get('/:id')
    @OnUndefined(TagNotFoundError)
    public one(@Param('id') id: number): Promise<Tag | undefined> {
        return this.tagService.findOne(id);
    }

    @Post()
    public create(@Body() tag: Tag): Promise<Tag> {
        return this.tagService.create(tag);
    }

    @Put('/:id')
    public update(@Param('id') id: number, @Body() tag: Tag): Promise<Tag> {
        return this.tagService.update(id, tag);
    }

    @Delete('/:id')
    public delete(@Param('id') id: number): Promise<void> {
        return this.tagService.delete(id);
    }

}
