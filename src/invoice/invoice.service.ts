import {  Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddInvoiceArgs } from './args/add-invoice.args';
import { UserService } from 'src/user/user.service';

@Injectable()
export class InvoiceService {
    
   
    constructor(@InjectRepository(Invoice)  public readonly invoiceRepo  : Repository<Invoice>,
     private readonly usrSvc : UserService
    ){}

    async findAllInvoice(): Promise<Invoice[]> {
      return this.invoiceRepo.find({ relations: ['user'] });
    }
    

    async addInvoice(addInvoiceInput: AddInvoiceArgs, userEmail: string): Promise<Invoice> {
      const user = await this.usrSvc.findOne(userEmail);

      if (!user) {
        throw new Error('User not found');
      }
      const { invoice_number, issue_date, due_date, total_amount, status } = addInvoiceInput;
      
      const invoice = new Invoice();
      
      
      invoice.user = user;
      invoice.invoice_number = invoice_number;
      invoice.issue_date = issue_date;
      invoice.due_date = due_date;
      invoice.total_amount = total_amount;
      invoice.status = status;
      
      return this.invoiceRepo.save(invoice);
    }

    async findOne(invoice_id: string): Promise<Invoice> {
      const invoice: Invoice = await this.invoiceRepo.findOne({
        where : {
          invoice_id: invoice_id
        }
      });
    
      if (!invoice) {
        throw new Error("Cannot find the invoice");
      }
    
      return invoice;
    }
    

    async deleteInvoice(invoiceId: string): Promise<void> {
      await this.invoiceRepo.delete(invoiceId);
    }

    async updateInvoice(invoiceId: string, updateInvoiceInput: AddInvoiceArgs): Promise<Invoice> {
      const { issue_date, due_date, total_amount, status } = updateInvoiceInput;

      let invoice = await this.invoiceRepo.findOne({
        where: {
          invoice_id: invoiceId
        }
      });

      if (!invoice) {
        throw new Error('Invoice not found');
      }
    
      invoice = {
        ...invoice,
        issue_date: issue_date || invoice.issue_date,
        due_date: due_date || invoice.due_date,
        total_amount: total_amount || invoice.total_amount,
        status: status || invoice.status,
      };
    
      return this.invoiceRepo.save(invoice);
    }
    
  
}
