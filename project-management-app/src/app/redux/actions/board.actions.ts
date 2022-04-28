import { createAction, props } from '@ngrx/store';
import { IBoard, IBoardDetail } from '../../shared/models/board.model';
import { HttpErrorResponse } from '@angular/common/http';

export const addBoard = createAction(
  'CREATE BOARD',
  props<{ board: IBoard }>(),
);

export const setBoardsList = createAction(
  'SET FETCHED BOARDS',
  props<{ boards: IBoardDetail[] }>(),
);

export const deleteBoard = createAction(
  'DELETE BOARD',
  props<{ id: string }>(),
);

export const changeBoard = createAction(
  'CHANGE BOARD',
  props<{ board: IBoard }>(),
);

export const addError = createAction(
  'ADD ERROR',
  props<{ error: HttpErrorResponse }>(),
);

export const clearError = createAction('ADD ERROR', props<{ error: null }>());
