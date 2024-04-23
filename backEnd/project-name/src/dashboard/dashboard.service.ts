import { Injectable, NotAcceptableException } from '@nestjs/common';
import { GroupsService } from 'src/groups/groups.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DashboardService {
    constructor(
        private groupService: GroupsService,
        private userService: UsersService
    ) {}

    
    // async getDataGroupByIdAdmin(id: string) {
        
    //     try {
    //         const group = await this.groupService.findGroupByIdAndRole(id);

    //         if(!group) {
    //             const newGroup = await this.groupService.createNewGroup(
    //                 id,
    //                 {
    //                     title: 'new group',
    //                     members:[{
    //                         idMember:id,
    //                         role: 'admin',
    //                         date: new Date(Date.now())
    //                     }]
    //                 }
    //             );
            
    //             const rooms = [];
    //             const admin = await this.userService.findOneUser(id)
    //             const members = [
    //                 {
    //                     ...admin
    //                 }
    //             ]
    //             return {
    //                 group: newGroup,
    //                 rooms: rooms,
    //                 members: members
    //             }
    //         };

    //         const listIdUser = group.members.map((member, index) => member.idMember)
    //         const members = await this.userService.findUsersByListId(listIdUser)
    //         const rooms = await this.groupService.findTitleRoomsByListId(group.rooms)
    //         return {
    //             group: group,
    //             rooms: rooms,
    //             members: members
    //         };
            
    //     } catch (error) {
    //         throw new NotAcceptableException('error')
    //     }
    // }


}
