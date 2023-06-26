import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { InvoiceSchema } from '../../invoice/schema/invoice.schema';

@ObjectType()
export class ItemSchema {
  @Field(() => ID)
  item_id: string;

  @Field(() => InvoiceSchema)
  invoice: InvoiceSchema;

  @Field()
  description: string;

  @Field()
  quantity: number;

  @Field(() => Float)
  unit_price: number;

  @Field(() => Float)
  line_total: number;
}
