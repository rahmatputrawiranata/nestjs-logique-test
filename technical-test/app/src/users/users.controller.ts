import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDTO } from './dto/register.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('register-dto')
  async registerDto(@Body() registerDTO: RegisterDTO) {
    return await this.usersService.createWithDTO(registerDTO);
  }

  @Post('register')
  @UseInterceptors(
    FilesInterceptor('photos', 10, {
      storage: multer.diskStorage({
        destination: './uploads/user-photos',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          const extention = file.originalname.split('.').pop();
          return cb(null, `${randomName}.${extention}`);
        },
      }),
    }),
  )
  async register(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image',
        })
        .build({}),
    )
    photos: Array<Express.Multer.File>,
    @Body() body,
  ) {
    const requiredFields = [
      'name',
      'address',
      'email',
      'password',
      'photos',
      'creditcard_type',
      'creditcard_name',
      'creditcard_number',
      'creditcard_expired',
      'creditcard_cvv',
    ];

    const validatorData = {
      ...body,
      photos: photos.map((photo) => photo.path),
    };

    const missingFields = requiredFields.filter(
      (field) => !validatorData[field],
    );
    if (missingFields.length) {
      throw new HttpException(
        {
          error: `Please provide ${missingFields.join(', ')} fields`,
        },
        400,
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      throw new HttpException(
        {
          error: 'Email data invalid',
        },
        400,
      );
    }

    return await this.usersService.createWithDTO(validatorData);
  }

  @Get('list')
  async list() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    console.log(id);

    return await this.usersService.findOneById(id);
  }

  @Patch()
  @UseInterceptors(
    FilesInterceptor('photos', 10, {
      storage: multer.diskStorage({
        destination: './uploads/user-photos',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          const extention = file.originalname.split('.').pop();
          return cb(null, `${randomName}.${extention}`);
        },
      }),
    }),
  )
  async update(
    @UploadedFiles() photos: Array<Express.Multer.File>,
    @Body() body,
  ) {
    const { user_id, ...data } = body;

    console.log(body);
    if (!user_id) {
      throw new HttpException(
        {
          error: 'Please provide user_id fields',
        },
        400,
      );
    }
    return await this.usersService.update(user_id, {
      ...data,
      photos: photos.map((photo) => photo.path).length
        ? photos.map((photo) => photo.path)
        : undefined,
    });
  }
}
