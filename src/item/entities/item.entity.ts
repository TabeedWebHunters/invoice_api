import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Invoice } from "../../invoice/entities/invoice.entity";

@Entity("item")
export class Item {
  @PrimaryGeneratedColumn("uuid")
  item_id: string;

  @ManyToOne(() => Invoice, invoice => invoice.items)
  invoice: Invoice;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column()
  unit_price: number;

  @Column()
  line_total: number;
}
