import {
    Authorized, Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put
} from 'routing-controllers';

import { ImageNotFoundError } from '../errors/ImageNotFoundError';
import { Image } from '../models/Image';
import { ImageService } from '../services/ImageService';

@Authorized()
@JsonController('/images')
export class ImageController {

    constructor(
        private imageService: ImageService
    ) { }

    @Get()
    public find(): Promise<Image[]> {
        return this.imageService.find();
    }

    @Get('/:id')
    @OnUndefined(ImageNotFoundError)
    public one(@Param('id') id: number): Promise<Image | undefined> {
        return this.imageService.findOne(id);
    }

    @Post()
    public create(@Body() image: Image): Promise<Image> {
        return this.imageService.create(image);
    }

    @Put('/:id')
    public update(@Param('id') id: number, @Body() image: Image): Promise<Image> {
        return this.imageService.update(id, image);
    }

    @Delete('/:id')
    public delete(@Param('id') id: number): Promise<void> {
        return this.imageService.delete(id);
    }

}
