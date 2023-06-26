import { ObjectType, Field, ID } from '@nestjs/graphql';
import { InvoiceSchema } from 'src/invoice/schema/invoice.schema';

@ObjectType()
export class UserSchema {
  @Field(() => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  role: string;

  @Field(() => [InvoiceSchema], { nullable: true })
  invoices?: InvoiceSchema[];
}
