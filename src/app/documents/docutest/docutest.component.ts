import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PdfMakeWrapper, Txt, Columns, Table, QR, Ul, Item } from 'pdfmake-wrapper';

class Product{
  product!: string;
  price!: number;
  quantity!: number;
}

class Invioce{
  name!: string;
  address!: string;
  number!: string;
  email!: string;

  products: Product[] = [];
  details!: string;

  constructor() {
    this.products.push(new Product());
  }
}

@Component({
  selector: 'app-docutest',
  templateUrl: './docutest.component.html',
  styleUrls: ['./docutest.component.css']
})
export class DocutestComponent implements OnInit {

  invoice = new Invioce();
  validateForm!: FormGroup;
  index1 = 0;

  constructor(private fb: FormBuilder, private message: NzMessageService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      address: [null, [Validators.required]],
      number: [null, [Validators.minLength(10), Validators.maxLength(10), Validators.required]],
      products: this.fb.array([
        this.fb.group({
          product: [null, [Validators.required]],
          price: [null, [Validators.required, Validators.min(0)]],
          quantity: [null, [Validators.required, Validators.min(0)]],
        })
      ]),
      details: [null, [Validators.maxLength(100)]]
    });
  }

  submitForm(): void {
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  generatePDF(): void {

    const pdf = new PdfMakeWrapper();

    if (this.validateForm.valid == true) {
      
      
      pdf.add(
        new Txt('Documento de prueba N°1').alignment('center').fontSize(16).color('#047886').end
      );

      pdf.add(
        new Txt('Factura').fontSize(20).bold().alignment('center').decoration('underline').color('skyblue').end
      );

      pdf.add(
        new Txt('Detalles del cliente').style('sectionHeader').end
      );

      pdf.add(
        new Columns(
        [
          [
            this.invoice.name,
            this.invoice.address,
            this.invoice.email,
            this.invoice.number
          ],
          [
            `Fecha: ${new Date().toLocaleString()}`,
            `Factura No : ${((Math.random() * 1000).toFixed(0))}`
          ]
        ]
        ).alignment('right').end
      );

      pdf.add(
        new Txt('Detalle').style('sectionHeader').end
      );

      pdf.add(
        new Table([
          ['Product', 'Price', 'Quantity', 'Amount'],
          ...this.invoice.products.map(p => ([p.product, p.price, p.quantity, (p.price * p.quantity).toFixed(2)])),
          [
            {text: 'Total Amount', colSpan: 3}, {}, {}, this.invoice.products.reduce((sum, p) => sum + (p.quantity * p.price), 0).toFixed(2)
          ]
        ]).headerRows(1).widths(['*', 'auto', 'auto', 'auto']).end
      );

      pdf.add(
        new Txt('Detalles adicionales').style('sectionHeader').end
      );

      pdf.add(
        new Txt(this.invoice.details).margin([0, 0 , 0, 15]).end
      );

      const signature = new Txt('Firma').alignment('right').italics();

      pdf.add(
        new QR(this.invoice.name).fit(50).end
      );

      pdf.add(
        new Ul([
          '__________________________________',
          'Firma',
        ]).bold().end
      );

      pdf.add(
        new Txt('Terminos y condiciones').style('sectionHeader').end
      );

      pdf.add(
        new Ul([
          'La orden puede ser regresada maximo en 10 dias.',
          'La garantia de los productos puede estar sujeta a las condiciones del productor.',
          'Este sistema ha generado la factura.',
        ]).end
      );

      pdf.styles({
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15]
        }
      });

      pdf.create().open();

    } else {
      this.submitForm();
      this.message.error('Por favor llena todo el formulario o verifica que no haya errores');
    }
    
  }

  addProduct(): void{
    this.invoice.products.push(new Product());
  }

}
