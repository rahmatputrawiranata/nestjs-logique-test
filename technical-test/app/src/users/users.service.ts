import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Document, Model, Types } from 'mongoose';
import { RegisterDTO } from './dto/register.dto';
import { UserDTO, UserListSearchParamDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  private mapToUserDto(
    user: Document<unknown, object, User> &
      User & {
        _id: Types.ObjectId;
      },
  ): UserDTO {
    return {
      user_id: user._id.toHexString(),
      name: user.name,
      email: user.email,
      address: user.address,
      photos: user.photos,
      creditcard: {
        type: user.creditcard.type,
        number: user.creditcard.number,
        name: user.creditcard.name,
        expired: user.creditcard.expired,
      },
    };
  }

  async findOneByEmail(email: string) {
    return this.userModel.findOne({
      email,
    });
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

    const password = await bcrypt.hash(user.password, 12)
    const createdData = {
      name: user.name,
      address: user.address,
      email: user.email,
      password: password,
      creditcard: {
        type: user.creditcard_type,
        number: user.creditcard_number,
        name: user.creditcard_name,
        expired: user.creditcard_expired,
        cvv: user.creditcard_cvv,
      },
      photos: user.photos,
    };
    const userCreated = await this.userModel.create(createdData);

    return this.mapToUserDto(userCreated);
  }

  async findAll(params: UserListSearchParamDTO): Promise<{
    count: number;
    rows: UserDTO[];
  }> {
    const { q, ob, sb, of, lt } = params;
    let sortBy: 'asc' | 'desc';
    let orderBy: undefined | string;
    const offset = of || 0;
    const limit = lt || 30;
    if (['asc', 'desc'].includes(sb) && ['name', 'email'].includes(ob)) {
      sortBy = sb as typeof sortBy;
      orderBy = ob;
    }
    let query: any;

    if (q) {
      query = {
        $or: [{ name: q }, { email: q }],
      };
    }

    const count = await this.userModel.countDocuments(query);
    const rows = await this.userModel
      .find(query)
      .sort({ [orderBy]: sortBy })
      .skip(offset)
      .limit(limit);

    return {
      count,
      rows: rows.map(this.mapToUserDto),
    };
  }

  async findOneById(id: string): Promise<UserDTO | null> {
    const user = await this.userModel.findById(id);
    return this.mapToUserDto(user);
  }

  async update(user_id: string, data): Promise<UserDTO> {
    const user = await this.userModel.findByIdAndUpdate(user_id, data);
    if (!user) {
      throw new HttpException(
        {
          error: 'User not found',
        },
        HttpStatus.NOT_MODIFIED,
      );
    }

    return this.findOneById(user_id)
  }
}
