import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users/users.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module'

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async(configService: ConfigService) => ({
      uri: configService.get<string>('MONGODB_URI'),
      autoCreate: false,
      autoIndex: false
    }),
    inject: [ConfigService]
  }),
  UsersModule
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
