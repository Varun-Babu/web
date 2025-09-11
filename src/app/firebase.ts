// src/app/firebase.ts
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { environment } from '../environments/environment';

// initialize Firebase app only once
if (!getApps().length) {
  initializeApp(environment.firebase);
}

// export Firestore instance
export const db = getFirestore();
