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
 goals = [
    { icon: '💻', title: 'Hands-on Learning', description: 'Project-first curriculum: build real apps and portfolios not just theory.' },
    { icon: '🤝', title: 'Mentorship & Industry Links', description: 'Regular mentorship from V4 and partner companies, guest talks, and internship pipelines.' },
    { icon: '🚀', title: 'Incubation for Ideas', description: 'Help students prototype and validate startup ideas with mini-incubation sprints.' },
    { icon: '📚', title: 'Skill Certification', description: 'Certificates for completed modules and projects that students can show to recruiters.' },
    { icon: '🌐', title: 'Community & Collaboration', description: 'Peers, hack nights, and inter-hub events to build a supportive developer community.' }
  ];

  activities = [
    { title: 'Weekly Workshops', desc: 'Hands-on coding, tools, and soft-skills sessions.', frequency: 'Weekly' },
    { title: 'Project Sprints', desc: '2 – 4 week sprints to build portfolio projects under mentors.', frequency: 'Every 1 month' },
    { title: 'Mentor Office Hours', desc: '1:1 mentorship for technical & career guidance.', frequency: 'Biweekly' },
    { title: 'Hackathons & Demos', desc: 'Showcase student projects and invite industry reviewers.', frequency: 'Quarterly' }
  ];

  benefits = [
    { title: 'For Students', text: 'Real project experience, internships, and a stronger portfolio.' },
    { title: 'For Colleges', text: 'Higher student employability and modern curriculum additions.' },
  
  ];

  timeline = [
    { phase: 'Month 1', activity: 'Recruit core team, run orientation & first workshops' },
    { phase: 'Month 2', activity: 'Start project sprints, onboarding mentors, host first demo' },
    { phase: 'Month 3', activity: 'Evaluate pilot, prepare playbook, onboard 1–2 new colleges' }
  ];

  involvementSteps = [
    { key: 'student', title: 'Students', desc: 'Join an existing hub — build projects, join sprints and learn hands-on.', cta: 'Join a Hub' },
    { key: 'mentor', title: 'Mentors & Alumni', desc: 'Guide students with office hours, project reviews and guest sessions.', cta: 'Become a Mentor' },
    { key: 'partner', title: 'Colleges & Partners', desc: 'Host a hub on campus, collaborate on internships and real projects.', cta: 'Partner With Us' }
  ];

  openSignup(role?: string) {
    const url = role ? `https://forms.gle/your-form?role=${role}` : 'https://forms.gle/your-form';
    window.open(url, '_blank');
  }

  
}
