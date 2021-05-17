import { Component, OnInit } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-docutest',
  templateUrl: './docutest.component.html',
  styleUrls: ['./docutest.component.css']
})
export class DocutestComponent implements OnInit {

  index1 = 0;
  index2 = 0;

  constructor() { }

  ngOnInit(): void {
  }

  generatePDF(): void {
    const docDefinition = {
      header: 'C#Corner PDF Header',
      content: 'Sample PDF generated with Angular and PDFMake for C#Corner Blog'
    };
    pdfMake.createPdf(docDefinition).open();
  }

}
