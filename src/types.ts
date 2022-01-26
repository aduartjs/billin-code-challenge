export type Invoice = {
  code: string;
  issuedDate: string;
  ownerName: string;
  contactName: string;
  subtotal: number;
  taxes: number;
  total: number;
  status: Status;
};

export type Status = 'issued' | 'draft';

export type PropertyError = {
  property: string;
  message: string;
};

export type InvoiceError = {
  line: number;
  errors: PropertyError[];
};

export interface ImportResult {
  ok: Invoice[];
  ko: InvoiceError[];
}
