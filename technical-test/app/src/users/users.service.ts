import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model, ObjectId, Types } from 'mongoose';
import { RegisterDTO } from './dto/register.dto';
@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) {}

    async findOneByEmail(email: string) {
        const res = await this.userModel.findOne({
            email
        });

        return res
    }

    async createWithDTO(user: RegisterDTO) {
        const isUserExists= await this.findOneByEmail(user.email)
        if(isUserExists) {
            throw new HttpException({
                error: 'User already exists'
            }, HttpStatus.BAD_REQUEST)
        }

        const userCreated = await this.userModel.create({
            name: user.name,
            address: user.address,
            email: user.email,
            password: user.password,
            creditcard: {
                type: user.creditcard_type,
                number: user.creditcard_number,
                name: user.creditcard_name,
                expired: user.creditcard_expired
            },
            photos: user.photos,
        })
        

        return userCreated
    }

    async findAll() {
        return await this.userModel.find()
    }

    async findOneById(id: string) {
        console.log(id)
        return await this.userModel.findById(id)
    }


    async update(user_id: string, data) {
        return await this.userModel.findByIdAndUpdate(user_id, data)
    }
}
