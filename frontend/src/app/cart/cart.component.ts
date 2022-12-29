import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { HttpClientService } from '../http-client.service';

import { Product } from '../models/Product'
import { Order } from '../models/Order';

import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  products: Product[] = [] as Product[]
  ordered_products: Product[] = [] as Product[]
  orders: Order[] = [] as Order[]
  total: number = 0;
  cc_number: number = NaN;
  full_name: string = '';
  address: string = ''
  constructor(private http_client: HttpClientService, private cart_service: CartService, public router: Router) { }
  ngOnInit(): void {
    this.http_client.getProducts().subscribe(res => {
      // Temp variable to flag unorder products
      this.products = res
      this.orders = this.cart_service.getOrders()
      let inOrder = false;

      if (this.orders.length != 0) {

        for (let i = 0; i < this.products.length; i++) {
          inOrder = false;
          for (let j = 0; j < this.orders.length; j++) {
            if (this.orders[j].product_id == this.products[i].id) {
              inOrder = true;
              break;
            }
          }
          if (inOrder == true) {
            this.total += this.products[i].price * this.getOrderQuantity(this.products[i].id)
            this.ordered_products.push(this.products[i])
          }
        }
      }
    })
  }

  getOrderQuantity(product_id: number): number {
    for (let i = 0; i < this.orders.length; i++) {

      if (this.orders[i].product_id == product_id) {
        return this.orders[i].quantity;
      }
    }
    // To supprise return type error but we are sure that our item had a quantity in this.quantity
    return 0;
  }

  getOrderIndex(product_id: number): number {
    for (let i = 0; i < this.orders.length; i++) {

      if (this.orders[i].product_id == product_id) {
        return i;
      }
    }
    // To supprise return type error but we are sure that our item had a quantity in this.quantity
    return 0;
  }
  done() {
    this.cart_service.setTotal(this.total)
    this.router.navigate(['/sucess']);

  }

  changeOrderQuantity() {
    this.calcTotal()
    setTimeout(() => alert("Cart total updated"),300);

  }


  calcTotal() {
    this.total = 0;

    for (let i = 0; i < this.ordered_products.length; i++) {
      this.total += this.ordered_products[i].price * this.getOrderQuantity(this.ordered_products[i].id)
    }
  }


  remove_item(product_id: number) {
    // https://stackoverflow.com/questions/24812930/how-to-remove-element-from-array-in-foreach-loop
    // As shown above 'delete' keyword is not good for deleting array while itrate over it 
    this.ordered_products.forEach((product, index, object) => {
      if (product.id == product_id) {
        object.splice(index, 1);
      }
    })

    this.orders.forEach((order, index, object) => {
      if (order.product_id == product_id) {
        object.splice(index, 1);
      }
    })
    setTimeout(() => alert("Product removed from cart"),300);

  }
}
