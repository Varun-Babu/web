import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card'; 
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-internships',
  imports: [NgFor, NgIf, MatCardModule,CommonModule,MatButtonModule],
  templateUrl: './internships.html',
  styleUrl: './internships.scss'
})
export class Internships {
 courses = [
  {
    title: 'Python Bootcamp',
    duration: '80 Days',
    fee: 25000,
        status: 'active',
    features: [
      'Live Daily Classes',
      'Hands-on Coding Practice',
      'LeetCode-Style Challenges',
      'DSA & Logic Building from Scratch',
      '1:1 Mentorship + Mock Interviews',
      'Progress Reviews Every 10 Days',
      'Certificate from V4 DevLabs'
    ]
  },
  {
    title: 'Flutter Developer Program',
    duration: '6 Months',
    fee: 40000,
        status: 'active',
    features: [
      '3 Months Training + 3 Months Internship',
      'Learn Dart, Flutter, Firebase, REST APIs',
      'State Management (Provider + Riverpod)',
      'Choose a Track: UI/UX, Backend, Testing',
      'Internship Project + ₹5,000/Month Stipend',
      'Certificate + 6-Month Industry Experience'
    ]
  },
  {
    title: 'Angular & .NET Full Stack',
    duration: '5 Months',
    fee: 35000,
    status: 'filled',
    features: [
      'Frontend with Angular 20+',
      'Backend APIs in ASP.NET Core',
      'Authentication & Role-Based Access',
      'Modular Code & Component Architecture',
      'Live Projects + Mentorship',
      'Completion Certificate + Placement Support'
    ]
  }
];

goToExternalLink() {
  window.open('https://forms.gle/kNmTJ8vBaeEhD1KC8', '_blank'); 
}
  

}
