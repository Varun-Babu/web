import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-about',
  imports: [RouterModule, RouterLink,CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {

}
