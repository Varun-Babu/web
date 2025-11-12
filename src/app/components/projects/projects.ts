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
      icon: '📱',
      title: 'Student-built Mobile Apps',
      description: 'Teams design and ship lightweight mobile apps solving campus & community problems — from reporting tools to campus services.',
      type: 'Student App',
      program: 'Hub Sprint'
    },
    {
      icon: '💻',
      title: 'Full-stack Web Projects',
      description: 'End-to-end web applications (frontend + backend + deployment) that students include in their portfolios.',
      type: 'Portfolio Project',
      program: 'Capstone'
    },
    {
      icon: '🤝',
      title: 'Community Projects & Open Source',
      description: 'Join a community of coders: contribute to shared repos, help peers, and build open-source utilities for nextBrick or campus tools.',
      type: 'Community',
      program: 'Open Source'
    },
    {
      icon: '🎓',
      title: 'Certification Courses',
      description: 'Short, skills-focused micro-courses with hands-on assessments and certificates students can show recruiters.',
      type: 'Certification',
      program: 'V4 Certificate'
    },
    {
      icon: '🔁',
      title: 'Internships & Live Product Work',
      description: 'Top-performing hub members are fast-tracked into internships on live product teams — real experience, real responsibilities.',
      type: 'Internship',
      program: 'Placement Pipeline'
    },
    {
      icon: '🧩',
      title: 'Hackathons & Mini-Sprints',
      description: '2–4 day hackathons and short sprints to prototype ideas, meet mentors and win pilot opportunities.',
      type: 'Sprint',
      program: 'Hack Nights'
    }
  ];
}
