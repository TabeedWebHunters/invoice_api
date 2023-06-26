import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Item } from "../../item/entities/item.entity"

@Entity("invoice")
export class Invoice {
  @PrimaryGeneratedColumn("uuid")
  invoice_id: string;

  @ManyToOne(() => User, user => user.invoices, { onDelete: "CASCADE" })
  user: User;

  @OneToMany(() => Item, invoiceItem => invoiceItem.invoice)
  items: Item[];

  @Column()
  invoice_number: string;

  @Column()
  issue_date: Date;

  @Column()
  due_date: Date;

  @Column()
  total_amount: number;

  @Column()
  status: string;
}
