import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserSchema } from '../../user/schema/user.schema';

@ObjectType()
export class InvoiceSchema {
  @Field(() => ID)
  invoice_id: string;

  @Field(() => UserSchema)
  user: UserSchema;

  @Field()
  invoice_number: string;

  @Field()
  issue_date: Date;

  @Field()
  due_date: Date;

  @Field()
  total_amount: number;

  @Field()
  status: string;
}
