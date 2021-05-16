import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './commons/layout/layout.component';
import { LoginComponent } from './commons/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
      {
        path: 'dashboard',
        loadChildren: () => import('./documents/document.module').then(m => m.DocumentModule)
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
