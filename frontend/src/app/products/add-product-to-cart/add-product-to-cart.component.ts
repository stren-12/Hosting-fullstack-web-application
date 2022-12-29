import { Component,Input, Output, EventEmitter} from '@angular/core';
import { Order } from '../../models/Order';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-add-product-to-cart',
  templateUrl: './add-product-to-cart.component.html',
  styleUrls: ['./add-product-to-cart.component.css']
})



export class AddProductToCartComponent {
  @Input() product_id = 0;
  @Output() add_order = new EventEmitter();
  quantity = 1
  convertStringToInt(str: string){
    return Number(str);
  }
  constructor(private cart_service: CartService){}


  AddOrder(){
    const order: Order = {
      product_id: this.product_id,
      quantity: this.quantity
    }

    this.add_order.emit(order)
  }
}
