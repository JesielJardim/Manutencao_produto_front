import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultProductComponent } from './consult-product/consult-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CreatProductComponent } from './creat-product/creat-product.component';


const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ConsultProductComponent },
  { path: 'add', component: CreatProductComponent },
  // { path: 'update/:id', component: UpdateProductComponent },
   { path: 'details/:id/:details', component: ProductDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }