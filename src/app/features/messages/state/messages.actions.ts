import { createAction, props } from '@ngrx/store';
import { Message } from './messages.model';

// Load Messages
export const loadMessages = createAction('[Messages] Load Messages');
export const loadMessagesSuccess = createAction('[Messages] Load Messages Success', props<{ messages: Message[] }>());
export const loadMessagesFailure = createAction('[Messages] Load Messages Failure', props<{ error: string }>());

// Add Message
export const addMessage = createAction('[Messages] Add Message', props<{ message: Message }>());
export const addMessageSuccess = createAction('[Messages] Add Message Success', props<{ message: Message }>());
export const addMessageFailure = createAction('[Messages] Add Message Failure', props<{ error: string }>());
