import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Table } from './schema/table.schema';
import { Model } from 'mongoose';
import { CreateTable } from 'src/dtos/roomDto/tableDto/create-table.dto';
import { randumId } from 'src/utils/randumId';
import { Room } from 'src/room/schemas/room.schema';
import { UpdateTable } from 'src/dtos/roomDto/tableDto/update-table.dto';
import { UpdateTableNew } from 'src/dtos/roomDto/tableDto/updateTableUpdate.dto';

@Injectable()
export class TableService {
    constructor (
        @InjectModel(Table.name) private TableModel: Model<Table>,
        @InjectModel(Room.name) private RoomModel: Model<Room>
    ) { }

    async createNewTable(createTable: CreateTable) {
       
        try {
            const newId = async () => {
                const id = randumId('r')
                try {
                    const oldId = await this.TableModel.findOne({idTable: id})
    
                    if(oldId) {                    
                       return newId()
                    };
    
                    return id
                } catch (error) {
                    return newId()
                }
            };

            const id = await newId()
            const newTable = {
                idTable: id,
                title: createTable.title,
                tasks:[]
            };

            await this.TableModel.create(newTable);
            await this.RoomModel.updateOne(
                {idRoom: createTable.idRoom},
                {$push: { 'tables': {
                    idTable: newTable.idTable,
                    title: newTable.title
                } }}
            );

            const roomAfterUpdate = await this.RoomModel.findOne({idRoom: createTable.idRoom});
            if(!roomAfterUpdate) throw new NotFoundException('error');
            return roomAfterUpdate
        } catch (error) {
            throw new NotFoundException('error')
        }
    };

    async getListTables(listIds: string[]) {
        try {
            const listTables = await this.TableModel.aggregate([
                {
                    $match: {
                        idTable: {$in: listIds}
                    }
                },
            ]);
            const listIdTable = listIds
            const sortListTable = listIdTable.map((idTable) => listTables.find(table => table.idTable === idTable))         
            return sortListTable
        } catch (error) {
            throw new NotFoundException('error')
        }
    };
    
    async getTableById(idTable: string) {
        try {
            
        } catch (error) {
            
        }
    }
    async delateTable(idTable: string, idRoom: string) {
        try {
            await this.TableModel.deleteOne({idTable: idTable});
            await this.RoomModel.updateOne(
                {idRoom: idRoom},
                {$pull:{tables: {table: idTable}}}
            );

            const roomAfterUpdate = await this.RoomModel.find({idRoom: idRoom});
            if(!roomAfterUpdate) throw new NotFoundException('error');
            return roomAfterUpdate

        } catch (error) {
            throw new NotFoundException('error')
        }
    };

    async updateRoomChangeIndexTable(updateTable: UpdateTableNew) {
        try {
            for(let i = 0; i <= updateTable.tables.length; i++) {
                await this.TableModel.updateOne(
                    {idTable: updateTable.tables[i].idTable},
                    {$set:{'tasks': updateTable.tables[i].tasks}}
                );
            }

            const roomAfterUpdate = this.RoomModel.findOne({
                idRoom: updateTable.idRoom
            })

            if(!roomAfterUpdate) throw new NotFoundException('error');
            return roomAfterUpdate
        } catch (error) {
            throw new NotFoundException('error')
        }
    }
}
