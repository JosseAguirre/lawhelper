import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocutestComponent } from './docutest/docutest.component';

const routes: Routes = [
  {path: 'docutest', component: DocutestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }
