import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { catchError, map, mergeMap, of, from, tap } from 'rxjs';
import * as MessagesActions from './messages.actions';
import { Message } from './messages.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class MessagesEffects {
  private readonly actions$ = inject(Actions);
  private readonly snackBar = inject(MatSnackBar);

  constructor( private firestore: Firestore) {}

  // Load Messages from Firestore
  loadMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.loadMessages),
      mergeMap(() => {
        const messagesRef = collection(this.firestore, 'messages');
        return collectionData(messagesRef, { idField: 'id' }).pipe(
          // @ts-ignore
          map((messages) => MessagesActions.loadMessagesSuccess({ messages })),
          catchError((error) => of(MessagesActions.loadMessagesFailure({ error: error.message })))
        );
      })
    )
  );

  // Add Message to Firestore
  addMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.addMessage),
      mergeMap(({ message }) => {
        const messagesRef = collection(this.firestore, 'messages');
        return addDoc(messagesRef, { ...message, createdAt: Date.now() }).then(() =>
          MessagesActions.addMessageSuccess({ message })
        ).catch(error =>
          MessagesActions.addMessageFailure({ error: error.message })
        );
      })
    )
  );

  showSuccessSnackbar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.addMessageSuccess),
      tap(() => {
        this.snackBar.open('Message added successfully!', 'Close', {
          duration: 10000,
          panelClass: 'snackbar-success'
        });
      })
    ), { dispatch: false }
  );

  showErrorSnackbar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.addMessageFailure),
      tap(() => {
        this.snackBar.open('Failed to add message!', 'Close', {
          duration: 10000,
          panelClass: 'snackbar-error'
        });
      })
    ), { dispatch: false }
  );
}
