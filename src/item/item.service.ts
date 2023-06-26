import { Injectable } from '@nestjs/common';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { InvoiceService } from 'src/invoice/invoice.service';

@Injectable()
export class ItemService {
  constructor(@InjectRepository(Item) public readonly itemRepo : Repository<Item>,
  private readonly invoSvc : InvoiceService
  ){}
  
  async createItem(invoiceId: string, createItemInput: CreateItemInput): Promise<Item> {
    const invoice = await this.invoSvc.findOne(invoiceId);
  
    if (!invoice) {
      throw new Error('Invoice not found');
    }
  
    const item = new Item();
    item.invoice = invoice;
    item.description = createItemInput.description;
    item.quantity = createItemInput.quantity;
    item.unit_price = createItemInput.unitPrice;
    item.line_total = createItemInput.lineTotal;
  
    return this.itemRepo.save(item);
  }
  
}
