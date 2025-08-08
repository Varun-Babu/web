import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterModule } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-projects',
  imports: [NgFor,RouterModule,RouterLink,MatButtonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {
  projects = [
    {
      title: 'Web Development Projects',
      description: 'HTML, CSS, JS, Angular, React-based academic websites.'
    },
    {
      title: 'Mobile App Projects',
      description: 'Android and Flutter-based projects for real-world needs.'
    },
  ];
}
