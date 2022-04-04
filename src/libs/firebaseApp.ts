import { FirebaseApp, initializeApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

import { firebaseConfig } from 'config/firebase';

export const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);

export const database: Firestore = getFirestore(firebaseApp);
