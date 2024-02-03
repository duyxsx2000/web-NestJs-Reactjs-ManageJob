import { Injectable , NotFoundException} from '@nestjs/common';
import { error } from 'console';
import { UpdateUserDto } from './dto/updtae-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from 'src/auth/manageRoles/role.enum';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import { Model } from 'mongoose';

@Injectable()

export class UsersService {
    
    constructor (@InjectModel(User.name) private userModel: Model<User>) {}

    async findAllUsers(email: string) {
        try {
            const users = await this.userModel.aggregate([
                {
                    $match: {
                        email: { $ne: 'émail' }
                    }
                },
            ])
            return users
        } catch (error) {
            throw new NotFoundException('error')
            
        }
    };

    async findOneUser(id: number) { 
        try {
            const user = await this.userModel.findOne({id: id});
            return user
        } catch (error) {
            throw new NotFoundException('error') 
        }

    };

    async findOneAuth(email: string) {
        try {
            const user = await this.userModel.findOne({email: email});
            return user
        } catch (error) {
            return undefined
        }
    }

    async createUser(createUserDto: CreateUserDto) {
        try {

            const res = await this.userModel.aggregate([
                {
                    $group: {
                        _id: null,
                        maxId: {$max:'$id'}   
                    }
                }
            ]);
           
            const maxId = res[0].maxId;
            const newUser = {
                ...createUserDto, 
                id: maxId + 1,
                idJobs:[0],
                wage:0
            };

            await this.userModel.create(newUser);          
            return newUser

        } catch (error) {
            throw new NotFoundException('error')  
        }
        
    };

    async delUser(id: number) {
        try {
            await this.userModel.deleteOne({id: id})
            const users = await this.findAllUsers('admin@gmail.com')
            console.log(users);
            
            return users
        } catch (error) {
            throw new NotFoundException('error')   
        } 
 
    };

    async updateUser(id: number, updateUserDto: UpdateUserDto) {
        console.log(updateUserDto);
        try {
            await this.userModel.updateOne(
                {id: id},
                {$set:updateUserDto}
            );
            const newUser = await this.userModel.findOne({id: id})
            return newUser
        } catch (error) {
            throw new NotFoundException('error')
        }
    }
 

    

   

}
