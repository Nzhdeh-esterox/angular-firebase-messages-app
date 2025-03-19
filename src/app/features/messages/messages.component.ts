import { Component, ViewEncapsulation, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { MatButton } from '@angular/material/button';

import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import * as MessagesActions from './state/messages.actions';
import { selectAllMessages, selectMessagesLoading } from './state/messages.selectors';
import { Message } from './state/messages.model';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, MatButton, MatTableModule, MatProgressSpinnerModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class MessagesComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  messages: Message[] = [];
  messagesSubscription: Subscription | undefined;

  displayedColumns: string[] = ['id', 'email', 'message', 'date'];
  loading$: Observable<boolean>;

  constructor(private dialog: MatDialog) {
    this.loading$ = this.store.pipe(select(selectMessagesLoading));

    // Dispatch action to load messages
    this.store.dispatch(MessagesActions.loadMessages());
  }

  ngOnInit(): void {
    // Dispatch action to load messages
    this.store.dispatch(MessagesActions.loadMessages());

    // Manually subscribe to messages$
    this.messagesSubscription = this.store.pipe(select(selectAllMessages)).subscribe((data) => {
      this.messages = data ?? []; // Ensure messages is never null
    });
  }

  formatDate(timestamp: number): string {
    return new Date(timestamp).toLocaleString(); // Format date
  }

  openDialog(): void {
    this.dialog.open(MessageDialogComponent, {
      width: '600px',
    });
  }

  ngOnDestroy(): void {
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
  }
}
