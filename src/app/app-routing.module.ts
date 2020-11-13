import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: TableComponent},
  {path: 'personas/:id', component: FormComponent},
  {path: '*', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
