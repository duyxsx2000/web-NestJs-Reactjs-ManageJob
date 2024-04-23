import { Body, Controller, Delete, Get, Header, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { TableService } from './table.service';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { CreateTable } from 'src/dtos/roomDto/tableDto/create-table.dto';
import { UpdateTable } from 'src/dtos/roomDto/tableDto/update-table.dto';
import { UpdateTableNew } from 'src/dtos/roomDto/tableDto/updateTableUpdate.dto';

@Controller('table')
export class TableController {
    constructor(private readonly tableService: TableService){}

    @Post('/fetchTable')
    async getTable(@Body(ValidationPipe) ids: string[]): Promise<ResponseData<{}>> {
        try {

            const listTable = await this.tableService.getListTables(ids)

            
            if(!listTable) new ResponseData<{}>({title: 'find room Error', data: null}, HttpStatus.ERROR, HttpMessage.ERROR);
            return new ResponseData<{}>({title: 'fetch List tables Success', data: listTable}, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<{}>({title: 'find room Error', data: null}, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    };

    @Post('/createTable/:id')
    async createTable(
        @Body(ValidationPipe) createTable: CreateTable
    ): Promise<ResponseData<{}>> {
        try {
            const roomAfterUpdate = await this.tableService.createNewTable(createTable)
            if(!roomAfterUpdate) new ResponseData<{}>({title: 'find room Error', data: null}, HttpStatus.ERROR, HttpMessage.ERROR);
            return new ResponseData<{}>({title: 'find room Success', data: roomAfterUpdate}, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<{}>({title: 'find room Error', data: null}, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    };

    @Delete('/getRoom/:idRoom')
    async deleteTable(): Promise<ResponseData<{}>> {
        try {

            // if(!room) new ResponseData<{}>({title: 'find room Error', data: null}, HttpStatus.ERROR, HttpMessage.ERROR);
            return new ResponseData<{}>({title: 'find room Success', data: ''}, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<{}>({title: 'find room Error', data: null}, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    };

    @Get('/getRoom/:idRoom')
    async getRoomByid(): Promise<ResponseData<{}>> {
        try {
            
            // if(!room) new ResponseData<{}>({title: 'find room Error', data: null}, HttpStatus.ERROR, HttpMessage.ERROR);
            return new ResponseData<{}>({title: 'find room Success', data: ''}, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<{}>({title: 'find room Error', data: null}, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    };

    
    @Patch('/updateTable/:id')
    async updateTable(
        @Body(ValidationPipe) updateTable: UpdateTableNew
    ): Promise<ResponseData<{}>> {
        try {
            const roomAfterUpdate = await this.tableService.updateRoomChangeIndexTable(updateTable)
            
            // if(!room) new ResponseData<{}>({title: 'find room Error', data: null}, HttpStatus.ERROR, HttpMessage.ERROR);
            return new ResponseData<{}>({title: 'find room Success', data: ''}, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<{}>({title: 'find room Error', data: null}, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    };

}
