import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import {
  IBoardDetail,
  IColumnList,
  ITask,
} from '../../shared/models/board.model';

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

export const deleteColumn = createAction(
  'DELETE COLUMN',
  props<{ boardID: string; columnDeleteID: string }>(),
);

export const updateColumn = createAction(
  'UPDATE COLUMN',
  props<{ boardID: string; columnUpdate: IColumnList }>(),
);

export const updateTask = createAction(
  'UPDATE TASK',
  props<{ boardID: string; columnID: string; taskID?: string; task: ITask }>(),
);

export const deleteTask = createAction(
  'DELETE TASK',
  props<{ boardID: string; columnID: string; taskDeleteID: string }>(),
);

export const addError = createAction(
  'ADD ERROR',
  props<{ error: HttpErrorResponse }>(),
);

export const clearError = createAction('CLEAR ERROR', props<{ error: null }>());
