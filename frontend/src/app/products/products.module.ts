import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // <<<< import it here

import { ProductsListComponent } from './products-list/products-list.component';
import { ProductComponent } from './product/product.component';
import {RouterModule} from '@angular/router';
import { AddProductToCartComponent } from './add-product-to-cart/add-product-to-cart.component';



@NgModule({
  declarations: [
    ProductsListComponent,
    AddProductToCartComponent,
    ProductComponent
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports:[
    ProductsListComponent,
    AddProductToCartComponent,
    ProductComponent
  ]
})
export class ProductsModule { }
