import { InvoiceService } from './invoice.service';
import { Invoice } from './entities/invoice.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { InvoiceSchema } from './schema/invoice.schema';
import { AddInvoiceArgs } from './args/add-invoice.args';


@Resolver(of => Invoice)
export class InvoiceResolver {
  constructor(private readonly invoiceService: InvoiceService) {}
  
  @Query(() => [InvoiceSchema], {name: "invoices"}) 
  getAllInvoice(): Promise<Invoice[]> {
    
    return this.invoiceService.findAllInvoice();
  }
  
  @Mutation(() => InvoiceSchema)
  addInvoice(
    @Args('addInvoiceInput') addInvoiceInput: AddInvoiceArgs,
    @Args('userEmail') userEmail: string,
  ): Promise<Invoice> {
    return this.invoiceService.addInvoice(addInvoiceInput, userEmail);
  }

  @Mutation(() => Boolean)
  async deleteInvoice(@Args('invoiceId') invoiceId: string): Promise<boolean> {
    await this.invoiceService.deleteInvoice(invoiceId);
    return true;
  }
  
  @Mutation(() => InvoiceSchema)
  updateInvoice(
    @Args('invoiceId', { type: () => String }) invoiceId: string,
    @Args('updateInvoiceInput') updateInvoiceInput: AddInvoiceArgs,
  ): Promise<Invoice> {
    return this.invoiceService.updateInvoice(invoiceId, updateInvoiceInput);
  }


  findOneInvoice(inv : string): Promise<Invoice>{
    return this.invoiceService.findOne(inv)
  }
}
