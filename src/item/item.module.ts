import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemResolver } from './item.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { InvoiceModule } from 'src/invoice/invoice.module';

@Module({
  imports:[TypeOrmModule.forFeature([Item]),InvoiceModule ],
  providers: [ItemResolver, ItemService],
  exports:[ItemService]

})
export class ItemModule {}
