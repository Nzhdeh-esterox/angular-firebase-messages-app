import { createReducer, on } from '@ngrx/store';
import * as MessagesActions from './messages.actions';
import { Message } from './messages.model';

export interface MessagesState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

const initialState: MessagesState = {
  messages: [],
  loading: false,
  error: null,
};

export const messagesReducer = createReducer(
  initialState,

  // Load Messages
  on(MessagesActions.loadMessages, (state) => ({ ...state, loading: true })),
  on(MessagesActions.loadMessagesSuccess, (state, { messages }) => ({
    ...state,
    loading: false,
    messages
  })),
  on(MessagesActions.loadMessagesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Add Message
  on(MessagesActions.addMessage, (state) => ({ ...state, loading: true })),
  on(MessagesActions.addMessageSuccess, (state, { message }) => ({
    ...state,
    loading: false,
    messages: [...state.messages, message]
  })),
  on(MessagesActions.addMessageFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
