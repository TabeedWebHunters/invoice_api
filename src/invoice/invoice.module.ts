import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceResolver } from './invoice.resolver';
import { InvoiceService } from './invoice.service';
import { Invoice } from './entities/invoice.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice]), UserModule],
  providers: [InvoiceResolver, InvoiceService],
  exports: [InvoiceService]
})
export class InvoiceModule {}
