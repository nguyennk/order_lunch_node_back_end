import { EntityRepository, Repository,  } from 'typeorm';

import { Tag } from '../models/Tag';

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag>  {

}
