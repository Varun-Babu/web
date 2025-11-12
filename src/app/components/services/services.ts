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
      icon: '🔗',
      title: 'nextBrick — Marketplace',
      description: 'Connect clients with vetted builders and service providers quickly and transparently.'
    },
    {
      icon: '🧭',
      title: 'Free Project Management',
      description: 'A lightweight PM module for companies: task tracking, attendance, expenses, and progress dashboards — free for smaller firms.'
    },
    {
      icon: '🏫',
      title: 'V4 Code Academy Hubs',
      description: 'Campus hubs that train B.Tech students through real product work — students build features and graduate with portfolios.'
    },
    {
      icon: '📈',
      title: 'Internships & Talent Placement',
      description: 'Internship pipelines from hubs into live product teams and partner companies — hire engineers who can ship.'
    },
   
  ];

  openContact() {
    window.location.href = 'mailto:contact@v4devlabs.com';
  }
}
