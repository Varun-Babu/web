import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-our-products',
  imports: [RouterLink, RouterModule,CommonModule],
  templateUrl: './our-products.html',
  styleUrl: './our-products.scss'
})
export class OurProducts {
loading = false;
  clicked = false;
  showMessage = false;

  showComingSoon() {
    this.clicked = true;
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.showMessage = true;

      setTimeout(() => {
        this.showMessage = false;
        this.clicked = false;
      }, 2000); 
    }, 1500); 
  }
}
