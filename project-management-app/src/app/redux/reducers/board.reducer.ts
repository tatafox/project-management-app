import { createReducer, on, Action } from '@ngrx/store';
import * as boardActions from '../actions/board.actions';
import { BoardState, initialBoardState } from '../state.models';

const reducer = createReducer(
  initialBoardState,
  on(boardActions.addBoard, (state) => {
    return { ...state };
  }),
  on(boardActions.setBoardsList, (state, { boards }) => {
    return { ...state, boards };
  }),
  on(boardActions.deleteBoard, (state) => {
    return { ...state };
  }),
  on(boardActions.changeBoard, (state) => {
    return { ...state };
  }),
  on(boardActions.addError, (state, { error }) => {
    return { ...state, error };
  }),
  // @ts-ignore
  on(boardActions.clearError, (state, { error }) => {
    return { ...state, error };
  }),
);

export function boardReducer(state: BoardState, action: Action): BoardState {
  return reducer(state, action);
}
