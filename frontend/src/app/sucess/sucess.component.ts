import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-sucess',
  templateUrl: './sucess.component.html',
  styleUrls: ['./sucess.component.css']
})
export class SucessComponent implements OnInit{
  total: number = 0;
  constructor(private cart_service:CartService){}

  ngOnInit(): void {
    this.total = this.cart_service.getTotal()
  }
}
