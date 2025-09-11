import { Component, OnInit, OnDestroy, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

// Firebase modular SDK imports
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, Firestore } from 'firebase/firestore';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-construction-app',
  standalone: true,
  templateUrl: './construction-app.html',
  styleUrls: ['./construction-app.scss'],
  imports:[CommonModule,FormsModule]
})
export class ConstructionApp implements OnInit, AfterViewInit, OnDestroy {
  countdown = {
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  };
  currentYear = new Date().getFullYear();
  private intervalId: any;
  private launchDate = new Date('2026-01-15T00:00:00').getTime();

  // IntersectionObserver instance
  private io: IntersectionObserver | null = null;

  // Firebase app + Firestore references (initialized in browser)
  private firebaseApp: any = null;
  private db: Firestore | null = null;

  // simple UI state flags for forms (bind these in template for feedback)
  companySubmitting = false;
  companySuccess = false;
  companyError: string | null = null;

  emailSubmitting = false;
  emailSuccess = false;
  emailError: string | null = null;
  emailModel: string = '';

  contactSubmitting = false;
  contactSuccess = false;
  contactError: string | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    // initialize Firebase only in browser (SSR-safe)
    if (isPlatformBrowser(this.platformId)) {
      try {
        this.firebaseApp = initializeApp(environment.firebase);
        this.db = getFirestore(this.firebaseApp);
      } catch (err) {
        // If already initialized or config missing, handle gracefully
        console.warn('Firebase init warning', err);
        this.db = this.db || null;
      }

      // start countdown
      this.startCountdown();
    }
  }

  ngAfterViewInit(): void {
    // only run observer in browser
    if (!isPlatformBrowser(this.platformId)) return;

    // options: trigger when ~12% of section visible
    const options = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.12
    };

    this.io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          el.classList.add('in-view');
          // optionally unobserve so it animates only once
          if (this.io) this.io.unobserve(el);
        }
      });
    }, options);

    // add reveal class and observe each section
    const sections = document.querySelectorAll<HTMLElement>('.section');
    sections.forEach(section => {
      // skip if it already has in-view (server-rendered)
      if (!section.classList.contains('reveal') && !section.classList.contains('in-view')) {
        section.classList.add('reveal');
      }
      if (this.io) this.io.observe(section);
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.io) {
      this.io.disconnect();
      this.io = null;
    }
  }

  // -------------------------
  // Countdown logic
  // -------------------------
  startCountdown(): void {
    this.updateCountdown();
    this.intervalId = setInterval(() => this.updateCountdown(), 1000);
  }

  updateCountdown(): void {
    const now = new Date().getTime();
    const timeLeft = this.launchDate - now;

    if (timeLeft <= 0) {
      if (this.intervalId) clearInterval(this.intervalId);
      this.countdown = { days: '00', hours: '00', minutes: '00', seconds: '00' };
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
  }

  padNumber(num: number): string {
    return String(num).padStart(2, '0');
  }

  // -------------------------
  // Firestore helpers
  // -------------------------
  private hasDb(): boolean {
    if (!this.db) {
      console.warn('Firestore not initialized.');
      return false;
    }
    return true;
  }

  /**
   * Submit company pre-registration
   * formValue: object containing the form fields (companyName, contactName, phone, email, city, serviceType, etc.)
   */
  async submitCompany(formValue: any) {
  if (!isPlatformBrowser(this.platformId)) return;
  if (!this.hasDb()) {
    this.companyError = 'Database not ready.';
    return;
  }

  this.companySubmitting = true;
  this.companyError = null;
  this.companySuccess = false;

  try {
    // --- Validation ---

    // 1. Required fields
    const requiredFields = [
      'companyName',
      'contactName',
      'phone',
      'email',
      'city',
      'serviceType'
    ];
    for (const field of requiredFields) {
      if (!formValue[field] || String(formValue[field]).trim() === '') {
        this.companyError = `Please fill out the ${field} field.`;
        this.companySubmitting = false;
        return;
      }
    }

    // 2. Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(formValue.email.trim())) {
      this.companyError = 'Please enter a valid email address.';
      this.companySubmitting = false;
      return;
    }

    // 3. Phone format (10 digits, no spaces or symbols)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formValue.phone.trim())) {
      this.companyError = 'Please enter a valid 10-digit phone number.';
      this.companySubmitting = false;
      return;
    }

    // --- Firestore write ---
    await addDoc(collection(this.db as Firestore, 'company_signups'), {
      companyName: formValue.companyName.trim(),
      contactName: formValue.contactName.trim(),
      phone: formValue.phone.trim(),
      email: formValue.email.trim().toLowerCase(),
      city: formValue.city.trim(),
      serviceType: formValue.serviceType,
      createdAt: serverTimestamp()
    });

    this.companySuccess = true;
  } catch (err: any) {
    console.error('Company signup error', err);
    this.companyError = 'Failed to submit. Please try again later.';
  } finally {
    this.companySubmitting = false;
  }
}

  /**
   * Subscribe email for launch notification
   */
async subscribeEmail(email: string) {
  if (!isPlatformBrowser(this.platformId)) return;

  // empty check
  if (!email) {
    this.emailError = 'Please enter an email.';
    return;
  }

  // email format check (basic regex)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email.trim())) {
    this.emailError = 'Please enter a valid email address.';
    return;
  }

  if (!this.hasDb()) {
    this.emailError = 'Database not ready.';
    return;
  }

  this.emailSubmitting = true;
  this.emailError = null;
  this.emailSuccess = false;

  try {
    await addDoc(collection(this.db as Firestore, 'subscribers'), {
      email: email.trim().toLowerCase(),
      createdAt: serverTimestamp()
    });
    this.emailSuccess = true;
    this.emailModel = '';
  } catch (err: any) {
    console.error('Subscribe error', err);
    this.emailError = 'Could not subscribe at the moment.';
  } finally {
    this.emailSubmitting = false;
  }
}


  /**
   * Send a contact message
   * formValue: { name, email, phone, message }
   */
  async sendContactMessage(formValue: any) {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!this.hasDb()) { this.contactError = 'Database not ready.'; return; }

    this.contactSubmitting = true;
    this.contactError = null;
    this.contactSuccess = false;

    try {
      await addDoc(collection(this.db as Firestore, 'contact_messages'), {
        name: formValue.name || null,
        email: formValue.email || null,
        phone: formValue.phone || null,
        message: formValue.message || null,
        createdAt: serverTimestamp()
      });
      this.contactSuccess = true;
    } catch (err: any) {
      console.error('Contact error', err);
      this.contactError = 'Failed to send message. Please try again later.';
    } finally {
      this.contactSubmitting = false;
    }
  }

  // smooth anchor scroll helper (optional)
  scrollTo(id: string) {
    if (isPlatformBrowser(this.platformId)) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
