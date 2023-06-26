import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Invoice } from "../../invoice/entities/invoice.entity";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToMany(() => Invoice, invoice => invoice.user, { cascade: true })
  invoices: Invoice[];
}
