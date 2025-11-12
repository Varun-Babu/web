import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';


import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, Firestore } from 'firebase/firestore';


import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-get-started',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    MatIconModule
  ],
  templateUrl: './get-started.html',
  styleUrls: ['./get-started.scss']
})
export class GetStarted implements OnInit {
  form!: FormGroup;

  roles = [
    { value: 'student', label: 'Student' },
    { value: 'mentor', label: 'Mentor & Alumni' },
    { value: 'partner', label: 'College / Partner' }
  ];

  // Firebase app + Firestore references
  private firebaseApp: FirebaseApp | null = null;
  private db: Firestore | null = null;

  // UI state
  submitting = false;
  success = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.form = this.fb.group({
      role: ['student', Validators.required], // default
      // shared fields
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s]{7,20}$/)]],
      // student-specific
      college: [''],
      degree: [''],
      year: [''],
      github: [''],
      // mentor-specific
      company: [''],
      expertise: [''],
      availability: [''],
      // partner-specific
      institutionName: [''],
      city: [''],
      capacity: [''],
      message: ['']
    });
  }

  ngOnInit(): void {
    // Initialize Firebase only in browser (SSR-safe)
    if (isPlatformBrowser(this.platformId)) {
      try {
        // If you initialize elsewhere globally, this will throw — catch and reuse existing.
        this.firebaseApp = initializeApp(environment.firebase);
        this.db = getFirestore(this.firebaseApp);
      } catch (err) {
        // If already initialized, getFirestore() will still work if app exists.
        try {
          this.db = getFirestore();
        } catch (e) {
          console.warn('Firestore init warning', err, e);
          this.db = null;
        }
      }
    }
  }

  // helper to check db
  private hasDb(): boolean {
    if (!this.db) {
      console.warn('Firestore not initialized.');
      return false;
    }
    return true;
  }

  // return current role value
  get role() {
    return this.form.get('role')!.value;
  }

  onRoleChange(ev: any) {
    const r = ev.value ?? this.role;
    this.clearRoleValidators();

    if (r === 'student') {
      this.form.get('college')!.setValidators([Validators.required]);
      this.form.get('degree')!.setValidators([Validators.required]);
      this.form.get('year')!.setValidators([Validators.required]);
    } else if (r === 'mentor') {
      this.form.get('company')!.setValidators([Validators.required]);
      this.form.get('expertise')!.setValidators([Validators.required]);
      this.form.get('availability')!.setValidators([Validators.required]);
    } else if (r === 'partner') {
      this.form.get('institutionName')!.setValidators([Validators.required]);
      this.form.get('city')!.setValidators([Validators.required]);
      this.form.get('capacity')!.setValidators([Validators.required]);
    }

    Object.keys(this.form.controls).forEach(k => {
      this.form.get(k)!.updateValueAndValidity();
    });
  }

  clearRoleValidators() {
    ['college','degree','year','company','expertise','availability','institutionName','city','capacity']
      .forEach(k => {
        this.form.get(k)!.clearValidators();
        this.form.get(k)!.setValue(''); // clear prev values for clean UX
      });
  }

  /**
   * Submit form — writes to different collections by role:
   *  - student -> collection 'students'
   *  - mentor  -> collection 'mentors'
   *  - partner -> collection 'colleges'
   */
  async submit() {
  this.success = false;
  this.error = null;

  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  if (!isPlatformBrowser(this.platformId)) return; // SSR guard
  if (!this.hasDb()) {
    this.error = 'Database not ready. Please try again later.';
    this.autoClearFlags(); // clear after 5s
    return;
  }

  this.submitting = true;

  const value = this.form.value;
  const basePayload: any = {
    name: value.name?.trim() || null,
    email: value.email?.trim().toLowerCase() || null,
    phone: value.phone?.trim() || null,
    role: value.role,
    createdAt: serverTimestamp()
  };

  try {
    if (value.role === 'student') {
      await addDoc(collection(this.db as Firestore, 'students'), {
        ...basePayload,
        college: value.college?.trim() || null,
        degree: value.degree?.trim() || null,
        year: value.year || null,
        github: value.github?.trim() || null
      });
    } else if (value.role === 'mentor') {
      await addDoc(collection(this.db as Firestore, 'mentors'), {
        ...basePayload,
        company: value.company?.trim() || null,
        expertise: value.expertise?.trim() || null,
        availability: value.availability?.trim() || null
      });
    } else if (value.role === 'partner') {
      await addDoc(collection(this.db as Firestore, 'colleges'), {
        ...basePayload,
        institutionName: value.institutionName?.trim() || null,
        city: value.city?.trim() || null,
        capacity: value.capacity?.trim() || null,
        message: value.message?.trim() || null
      });
    }

this.success = true;

// Reset form values
this.form.reset({ role: 'student' });

// Clear the touched/dirty states so inputs don’t stay red
Object.keys(this.form.controls).forEach(key => {
  const control = this.form.get(key);
  control?.markAsPristine();
  control?.markAsUntouched();
  control?.updateValueAndValidity();
});


  } catch (err: any) {
    console.error('Submit error', err);
    this.error = 'Something went wrong. Please try again.';
  } finally {
    this.submitting = false;
    this.autoClearFlags(); // clear success/error after 5s
  }
}

/** helper: clear success/error after 5 seconds */
private autoClearFlags() {
  setTimeout(() => {
    this.success = false;
    this.error = null;
  }, 5000);
}

}
