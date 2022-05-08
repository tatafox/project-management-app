import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { IBoardDetail, ITask } from '../../shared/models/board.model';

export const addBoard = createAction(
  'CREATE BOARD',
  props<{ board: IBoardDetail }>(),
);

export const setBoardsList = createAction(
  'SET FETCHED BOARDS',
  props<{ boards: IBoardDetail[] }>(),
);

export const deleteBoard = createAction(
  'DELETE BOARD',
  props<{ id: string }>(),
);

export const updateBoard = createAction(
  'UPDATE BOARD',
  props<{ board: IBoardDetail }>(),
);

export const updateTask = createAction(
  'UPDATE TASK',
  props<{ boardID: string; columnID: string; task: ITask }>(),
);

export const deleteTask = createAction(
  'UPDATE TASK',
  props<{ boardID: string; columnID: string; taskID: string }>(),
);

export const addError = createAction(
  'ADD ERROR',
  props<{ error: HttpErrorResponse }>(),
);

export const clearError = createAction('CLEAR ERROR', props<{ error: null }>());
