import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop()
  userId: string;

  @Prop()
  email: string;

  @Prop()
  birthday: string;

  @Prop()
  favoriteFoods: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
