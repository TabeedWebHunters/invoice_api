import { ArgsType, Field, ID } from "@nestjs/graphql";
import {AddInvoiceArgs} from './add-invoice.args'

@ArgsType()
export class UpdateInvoiceArgs {
  @Field(() => ID)
  invoice_id: number;

  @Field(() => AddInvoiceArgs)
  invoice: AddInvoiceArgs;
}