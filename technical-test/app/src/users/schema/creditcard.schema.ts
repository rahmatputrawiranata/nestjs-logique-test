import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

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

  @Prop({ required: true })
  cvv: string;
}

export const CreditCardSchema = SchemaFactory.createForClass(CreditCard);
