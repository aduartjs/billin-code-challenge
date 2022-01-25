import { Invoice, PropertyError } from './types';

export class Validator {
  validate = (invoice: Invoice): PropertyError[] => {
    const errors: PropertyError[] = [];

    if (this.isStatusInvalid(invoice.status))
      errors.push({ property: 'status', message: 'invalid' });

    if (this.isEmpty(invoice.ownerName))
      errors.push({
        property: 'ownerName',
        message: 'required',
      });

    if (this.isEmpty(invoice.code))
      errors.push({ property: 'code', message: 'required' });

    if (isNaN(invoice.total))
      errors.push({ property: 'total', message: 'invalid' });

    return errors;
  };

  private isStatusInvalid = (status: string): boolean => {
    return status !== 'draft' && status !== 'issued';
  };

  private isEmpty = (value: string): boolean => {
    return value === '';
  };
}
