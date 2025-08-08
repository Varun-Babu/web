import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  imports: [NgFor],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class Services {
 services = [
    {
      title: 'Internship Programs',
      description: 'Hands-on internships with real-world project experience.'
    },
    {
      title: 'Web Development',
      description: 'Custom website and application development.'
    },
    {
      title: 'Mobile Apps',
      description: 'Cross-platform mobile applications built using Flutter.'
    },
    {
      title: 'Corporate Training',
      description: 'Technical workshops and employee upskilling sessions.'
    },
  ];
}
