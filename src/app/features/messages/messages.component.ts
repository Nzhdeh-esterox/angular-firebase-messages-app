import { Component, ViewEncapsulation, inject, OnDestroy, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import * as MessagesActions from './state/messages.actions';
import { selectAllMessages, selectMessagesLoading } from './state/messages.selectors';
import { Message } from './state/messages.model';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    CommonModule, MatButtonModule, MatTableModule, MatProgressSpinnerModule, MatPaginatorModule
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class MessagesComponent implements OnInit, OnDestroy, AfterViewInit {
  private readonly store = inject(Store);
  messages!: MatTableDataSource<Message>;
  messagesSubscription: Subscription | undefined;

  displayedColumns: string[] = ['id', 'email', 'message', 'date'];
  loading$: Observable<boolean>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog) {
    this.loading$ = this.store.pipe(select(selectMessagesLoading));

    // Dispatch action to load messages
    this.store.dispatch(MessagesActions.loadMessages());
  }

  ngOnInit(): void {
    // Dispatch action to load messages
    this.store.dispatch(MessagesActions.loadMessages());

    // Subscribe to messages and update dataSource
    this.messagesSubscription = this.store.pipe(select(selectAllMessages)).subscribe((data) => {
      this.messages = new MatTableDataSource<Message>(data);

      if (this.paginator) {
        this.messages.paginator = this.paginator; // Ensure paginator is set when data arrives
      }
    });
  }

  ngAfterViewInit() {
    if (this.paginator && this.messages) {
      this.messages.paginator = this.paginator;
    }
  }

  truncateMessage(message: string, length: number = 100): string {
    return message.length > length ? message.slice(0, length) + '...' : message;
  }

  openDialog(): void {
    this.dialog.open(MessageDialogComponent, {
      width: '600px',
    });
  }

  ngOnDestroy(): void {
    this.messagesSubscription?.unsubscribe();
  }
}
