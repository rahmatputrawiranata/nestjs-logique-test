import { HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model, ObjectId, Types } from 'mongoose';
import { RegisterDTO } from './dto/register.dto';
import { UserDTO, UserListSearchParamDTO } from './dto/user.dto';
import { error } from 'console';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOneByEmail(email: string) {
    const res = await this.userModel.findOne({
      email,
    });

    return res;
  }

  async createWithDTO(user: RegisterDTO): Promise<UserDTO> {
    const isUserExists = await this.findOneByEmail(user.email);
    if (isUserExists) {
      throw new HttpException(
        {
          error: 'User already exists',
        },
        HttpStatus.BAD_REQUEST,
      );
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
        expired: user.creditcard_expired,
      },
      photos: user.photos,
    });

    return {
        user_id: userCreated._id.toHexString(),
        ...userCreated
      }
  }

  async findAll(params: UserListSearchParamDTO): Promise<{
    count: number;
    rows: UserDTO[]
  }> {
    const { q, ob, sb,  of, lt } = params;
    let sortBy: undefined | number;
    let orderBy: undefined | string;
    const offset = of || 0;
    const limit = lt || 30;
    if(sb && ['name', 'email'].includes(ob)) {
      sortBy = sb.toLowerCase() === 'asc' ? 1 : sb.toLowerCase() === 'desc' ? -1 : undefined;
      orderBy = ob;
    }

    const query = {
      $or: [
        {name: q},
        {email: q}
      ]
    }
    return await this.userModel.find(query).sort({[sb]: ob}).skip(of).limit(lt

    );
  }

  async findOneById(id: string): Promise<UserDTO | null> {
    return await this.userModel.findById(id);
  }

  async update(user_id: string, data): Promise<UserDTO> {
    const resp = await this.userModel.findByIdAndUpdate(user_id, data);
    if(!resp) {
        throw new HttpException(
            {
                error: 'User not found'
            },
            HttpStatus.NOT_MODIFIED
        )
    }

    return {
      user_id: resp._id.toHexString(),
      ...resp
    };
}
}
