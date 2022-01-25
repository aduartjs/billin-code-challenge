export type Invoice = {
  code: string;
  issuedDate: string;
  ownerName: string;
  contactName: string;
  subtotal: number;
  taxes: number;
  total: number;
  status: string;
};

export type PropertyError = {
  property: string;
  message: string;
}

export type InvoiceError = {
  line: number;
  errors: PropertyError[];
}