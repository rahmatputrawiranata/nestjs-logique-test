import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { KeyMiddleware } from './key.middleware';
@Module({
    imports: [MongooseModule.forFeature([
        {name: User.name, schema: UserSchema}
    ])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
// export class UsersModule {}
export class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(KeyMiddleware)
            .forRoutes(UsersController);
    }
}
