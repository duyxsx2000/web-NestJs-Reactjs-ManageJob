import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/manageRoles/roles.guard';
import { Roles } from 'src/auth/manageRoles/roles.decorator';
import { Role } from 'src/auth/manageRoles/role.enum';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';

@UseGuards(AuthGuard, RolesGuard)
@Controller('dashboard')
export class DashboardController {
    constructor (private dashboardService: DashboardService){}

    // @Roles(Role.Admin)
    // @Get('/admin/g')
    // async getDataGroup(@Request() req): Promise<ResponseData<{}>> {

    //     try {           
    //         const res = await this.dashboardService.getDataGroupByIdAdmin(req.user.idUser)          
    //         return  new ResponseData<{}>(res, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
    //     } catch (error) {
    //         return  new ResponseData<{}>(null, HttpStatus.ERROR, HttpMessage.ERROR)
    //     }
   
    // }
}

