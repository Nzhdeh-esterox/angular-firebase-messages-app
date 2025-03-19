import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { messagesReducer } from './features/messages/state/messages.reducer';
import { MessagesEffects } from './features/messages/state/messages.effects';
import { appRoutes } from './app.routes';
import { firebaseConfig } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)), // Initialize Firebase
    provideFirestore(() => getFirestore()), // Enable Firestore

    // NGRX Store & Effects
    provideStore(),
    provideState('messages', messagesReducer),
    provideEffects([MessagesEffects])
  ],
};
