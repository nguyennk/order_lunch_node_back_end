import {
    Body,
    JsonController,
    Post,
    Param,
    Get,
    Authorized,
} from 'routing-controllers';
import { FoodyService } from '../services/FoodyService';
import { PostString } from '../models/PostString';

@Authorized()
@JsonController('/foody')
export class AuthenticationController {
    constructor(private foodyService: FoodyService) {}
    @Get('/update/:id')
    public getDishesByFoodyId(@Param('id') id: number): any {
        return this.foodyService.updateDishesByRestaurantId(id);
    }

    @Post()
    public async getDishesByFoodyURL(
        @Body() postString: PostString
    ): Promise<any> {
        return this.foodyService.retrieveRestaurantByURL(postString.payload);
    }

    @Post('/raw')
    public async getRawFoodyURL(@Body() postString: PostString): Promise<any> {
        return this.foodyService.debugRestaurant(postString.payload);
    }
}
