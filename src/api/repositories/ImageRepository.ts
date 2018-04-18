import { EntityRepository, Repository } from 'typeorm';

import { Image } from '../models/Image';

@EntityRepository(Image)
export class ImageRepository extends Repository<Image>  {

}
