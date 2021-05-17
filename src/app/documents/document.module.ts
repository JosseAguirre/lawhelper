import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

import { DocumentRoutingModule } from './document-routing.module';
import { DocutestComponent } from './docutest/docutest.component';


@NgModule({
  declarations: [
    DocutestComponent
  ],
  imports: [
    CommonModule,
    DocumentRoutingModule,
    NzCardModule,
    NzButtonModule,
    NzInputModule,
    NzFormModule,
    NzTabsModule
  ]
})
export class DocumentModule { }
