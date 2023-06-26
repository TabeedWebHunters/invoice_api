
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface AddInvoiceArgs {
    invoice_number: string;
    issue_date: DateTime;
    due_date: DateTime;
    total_amount: number;
    status: string;
}

export interface CreateItemInput {
    description: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
}

export interface UserSchema {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    invoices?: Nullable<InvoiceSchema[]>;
}

export interface InvoiceSchema {
    invoice_id: string;
    user: UserSchema;
    invoice_number: string;
    issue_date: DateTime;
    due_date: DateTime;
    total_amount: number;
    status: string;
}

export interface ItemSchema {
    item_id: string;
    invoice: InvoiceSchema;
    description: string;
    quantity: number;
    unit_price: number;
    line_total: number;
}

export interface IQuery {
    index(): string | Promise<string>;
    login(email: string, password: string): string | Promise<string>;
    invoices(): InvoiceSchema[] | Promise<InvoiceSchema[]>;
}

export interface IMutation {
    signup(firstName: string, lastName: string, email: string, password: string, role: string): string | Promise<string>;
    addInvoice(addInvoiceInput: AddInvoiceArgs, userEmail: string): InvoiceSchema | Promise<InvoiceSchema>;
    deleteInvoice(invoiceId: string): boolean | Promise<boolean>;
    updateInvoice(invoiceId: string, updateInvoiceInput: AddInvoiceArgs): InvoiceSchema | Promise<InvoiceSchema>;
    deleteUserByEmail(email: string): boolean | Promise<boolean>;
    createItem(invoiceId: string, createItemInput: CreateItemInput): ItemSchema | Promise<ItemSchema>;
}

export type DateTime = any;
type Nullable<T> = T | null;
