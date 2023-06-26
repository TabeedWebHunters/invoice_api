import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateItemInput {
  @Field()
  description: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => Int)
  unitPrice: number;

  @Field(() => Int)
  lineTotal: number;
}
