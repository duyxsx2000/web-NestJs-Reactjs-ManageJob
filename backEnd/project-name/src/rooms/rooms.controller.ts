import { Controller, Get } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomsService: RoomsService){}
    @Get()
    async index() {
        const data = await this.roomsService.test()
        console.log(data,'data');
        return data
    }
}
