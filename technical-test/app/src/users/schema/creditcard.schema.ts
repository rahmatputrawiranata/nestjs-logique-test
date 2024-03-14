import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserCreditcardDocument = HydratedDocument<CreditCard>;

@Schema()
export class CreditCard extends Document {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  number: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  expired: string;
}

export const CreditCardSchema = SchemaFactory.createForClass(CreditCard);