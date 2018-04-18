import { GraphQLFieldConfig, GraphQLList } from 'graphql';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { AbstractGraphQLQuery, GraphQLContext, Query } from '../../lib/graphql';
import { Image } from '../models/Image';
import { ImageService } from '../services/ImageService';
import { ImageType } from '../types/ImageType';

@Query()
export class GetImagesQuery extends AbstractGraphQLQuery<GraphQLContext<any, any>, Image[], any> implements GraphQLFieldConfig {
    public type = new GraphQLList(ImageType);
    public allow = [];
    public args = {};

    constructor(
        private imageService: ImageService,
        @Logger(__filename) private log: LoggerInterface
    ) {
        super();
    }

    public async run(root: any, args: any, context: GraphQLContext<any, any>): Promise<Image[]> {
        const images = await this.imageService.find();
        this.log.info(`Found ${images.length} images`);
        return images;
    }

}
