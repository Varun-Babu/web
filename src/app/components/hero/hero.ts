import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-hero',
  imports: [CommonModule,RouterModule,MatButtonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero {

}
