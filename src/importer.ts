import { parse, Parser } from 'csv-parse/';
import * as fs from 'fs';
import { ImportResult, Invoice, InvoiceError } from './types';
import { Validator } from './validator';

export class Importer {
  async import(filePath: string): Promise<ImportResult> {
    const ok: Invoice[] = [];
    const ko: InvoiceError[] = [];
    const validator = new Validator();
    try {
      const parser = this.parseCSV(filePath);
      let line = 1;
      for await (const invoice of parser) {
        const errors = validator.validate(invoice);
        errors.length == 0
          ? ok.push(invoice)
          : ko.push({ line: line, errors: errors });
        line++;
      }
    } catch (error) {
      console.error(error);
    } finally {
      return {
        ok: ok,
        ko: ko,
      };
    }
  }

  private parseCSV = (filePath: string): Parser => {
    return fs
      .createReadStream(`${__dirname}/../files/${filePath}`)
      .on('error', (error) => {
        console.error(error);
      })
      .pipe(
        parse({
          columns: [
            'code',
            'issuedDate',
            'ownerName',
            'contactName',
            'subtotal',
            'taxes',
            'total',
            'status',
          ],
          cast: (value, context) => {
            return this.castToNumber(context.index, value);
          },
          trim: true,
          from_line: 2,
          delimiter: ';',
        }),
      );
  };

  private castToNumber = (index: number, value: string): string | number => {
    return index === 4 || index === 5 || index === 6 
    ? Number(value) 
    : value;
  };
}
