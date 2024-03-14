import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type UserDocument = HydratedDocument<User>;


@Schema({collection: 'user'})
export class User {
    @Prop({required: true})
    name: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    address: string;

    @Prop({required: true})
    password: string;

    @Prop({ type: Types.ObjectId, ref: 'CreditCard' })
    creditcard: Types.ObjectId;

    @Prop({required: true, type: [String]})
    photos: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);




