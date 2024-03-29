import { Injectable , NotFoundException} from '@nestjs/common';
import { error } from 'console';
import { UpdateUserDto } from '../dtos/useDtos/updtae-user.dto';
import { CreateUserDto } from '../dtos/useDtos/create-user.dto';
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
                        email: { $ne: 'email' }
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
        console.log(createUserDto);
        const randumId = async () => {
            let id = 'u';
            const string = 'qwertyuiopasdfghjklzxcvbnm1234567890';

            for(var i = 1; i <= 5; i++) {
                const randomIndex = Math.floor(Math.random() * string.length);
                id += string[randomIndex];
            };

            try {
                const oldId = await this.userModel.findOne({id: id});

                if(oldId) {
                    return randumId()
                };

                return id
            } catch (error) {
                return null
            }   
        }
        const id = await randumId();
        console.log(id);
          
        try {
            
            const checkEmail = await this.userModel.findOne({email: createUserDto.email})
            if (checkEmail) {
                throw new NotFoundException('error')
            };
            await this.userModel.create({
                ...createUserDto,
                id: id
            })
            return 'ok'

        } catch (error) {
            throw new NotFoundException('error')  
        }     
    };

    async delUser(id: number) {
        try {
            await this.userModel.deleteOne({id: id});
            const users = await this.findAllUsers('admin@gmail.com');
            
            return users
        } catch (error) {
            throw new NotFoundException('error')   
        } 
 
    };
    async delAll() {
        try {
            await this.userModel.deleteMany({})
            console.log('all2');
            return [123,123]
        } catch (error) {
            console.log(error);
            
        }
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto) {
        try {
            await this.userModel.updateOne(
                {id: id},
                {$set:updateUserDto}
            );
            const newUser = await this.userModel.findOne({id: id});
            return newUser
        } catch (error) {
            throw new NotFoundException('error')
        }
    };
 

}
