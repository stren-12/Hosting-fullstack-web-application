import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { HttpClientService } from 'src/app/http-client.service';
import { Order } from 'src/app/models/Order';
import { CartService } from 'src/app/cart.service';

import { Product } from 'src/app/models/Product';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: Product[] = []
  @Output() order = new EventEmitter();

  constructor(private cart_service: CartService, private http: HttpClientService) { }
  ngOnInit(): void {
    this.http.getProducts().subscribe(res => {
      this.products = res;
    });
  }

  AddOrder(order: Order){
    this.cart_service.addOrder(order);
    alert("Order added to cart successfuly");
  }

  
}
