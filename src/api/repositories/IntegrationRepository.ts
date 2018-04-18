import { EntityRepository, Repository } from 'typeorm';

import { Integration } from '../models/Integration';

@EntityRepository(Integration)
export class IntegrationRepository extends Repository<Integration>  {

}
