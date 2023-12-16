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

    async findAllUsers() {
        try {
            const users = await this.userModel.find();
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
        const x= 123
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
                idJobs:[0]
            };

            await this.userModel.create(newUser);
            console.log('create done' ,newUser);
            
            return newUser

        } catch (error) {
            throw new NotFoundException('error')  
        }
        
    };

    async delUser(id: number) {
        try {
            await this.userModel.deleteOne({id: id})
            return null
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
