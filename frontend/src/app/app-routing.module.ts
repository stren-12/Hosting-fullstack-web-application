import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { ProductComponent } from './products/product/product.component';
import { CartComponent } from './cart/cart.component';
import { SucessComponent } from './sucess/sucess.component';

const routes: Routes = [
  { path: '', component:IndexComponent },
  { path: 'product/:id', component:ProductComponent},
  { path: 'cart', component:CartComponent},
  { path: 'sucess', component:SucessComponent},

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
