
import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-construction-app',
  imports: [],
  templateUrl: './construction-app.html',
  styleUrl: './construction-app.scss'
})
export class ConstructionApp implements OnInit, OnDestroy   {


 countdown = {
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  };

  private intervalId: any;
  private launchDate = new Date('2025-08-31T00:00:00').getTime(); 

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    this.startCountdown();
  }

  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startCountdown(): void {
    this.intervalId = setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = this.launchDate - now;

      if (timeLeft < 0) {
        clearInterval(this.intervalId);
        this.countdown = {
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00'
        };
        return;
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      this.countdown = {
        days: this.padNumber(days),
        hours: this.padNumber(hours),
        minutes: this.padNumber(minutes),
        seconds: this.padNumber(seconds)
      };

    }, 1000);
  }

  padNumber(num: number): string {
    return String(num).padStart(2, '0');
  }
}
