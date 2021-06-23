import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-docutest',
  templateUrl: './docutest.component.html',
  styleUrls: ['./docutest.component.css']
})
export class DocutestComponent implements OnInit {

  validateForm!: FormGroup;
  index1 = 0;
  index2 = 0;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      nombre: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      direccion: [null, [Validators.required]],
      numero: [null, [Validators.minLength(10), Validators.maxLength(10), Validators.required]]
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
    const docDefinition = {
      header: 'C#Corner PDF Header',
      content: 'Sample PDF generated with Angular and PDFMake for C#Corner Blog'
    };
    pdfMake.createPdf(docDefinition).open();
  }

}
