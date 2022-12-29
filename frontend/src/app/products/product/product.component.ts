
import { Component, OnInit,Input } from '@angular/core';
import { HttpClientService } from 'src/app/http-client.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/cart.service';

import {Product} from '../../models/Product'
import { Order } from 'src/app/models/Order';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  products: Product[] = [];
  id: number =0;
  product: Product = new Object as Product;
  constructor(private cart_service: CartService, private http: HttpClientService,private route: ActivatedRoute) { }
  ngOnInit(): void {
    
    this.http.getProducts().subscribe(res => {
      this.id =  Number(this.route.snapshot.paramMap.get('id'));
      this.products = res;
      this.product = this.products[this.id-1];
    });

  }

  AddOrder(order: Order){
    this.cart_service.addOrder(order);
    alert("Order added to cart successfuly");
  }
}
