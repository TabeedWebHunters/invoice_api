import {  Field,  InputType } from '@nestjs/graphql';

@InputType()
export class AddInvoiceArgs {
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




