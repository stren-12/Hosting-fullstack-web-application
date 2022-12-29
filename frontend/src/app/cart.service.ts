import { Injectable } from '@angular/core';

import { Order } from '../app/models/Order';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  

  private orders = [] as Order[];
  private total = 0;
  
  setTotal(total: number){
   this.total = total 
  }

  getTotal(){
    return this.total
  }
  getOrders(): Order[] {
    return this.orders
  }
  
  addOrder(order: Order): boolean {
    // Check if no orders presents add new one
    if (this.orders.length == 0) {
      this.orders.push({ quantity: order.quantity, product_id: order.product_id })
      return true;
    }

    // Check if the user want to update the order
    for (let i = 0; i < this.orders.length; i++){
      if(this.orders[order.product_id]?.product_id == order.product_id){
        this.orders[order.product_id].quantity = order.quantity;
        return true;
      }
    }

    this.orders.push ({ quantity: order.quantity, product_id: order.product_id })

    return true;
  }



}
