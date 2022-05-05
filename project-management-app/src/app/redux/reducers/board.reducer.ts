/* eslint-disable no-restricted-syntax */
import { createReducer, on, Action } from '@ngrx/store';
import * as boardActions from '../actions/board.actions';
import { BoardState, initialBoardState } from '../state.models';

const reducer = createReducer(
  initialBoardState,
  on(boardActions.addBoard, (state, { board }) => ({
    ...state,
    boards: [...state.boards, board],
  })),
  on(boardActions.setBoardsList, (state, { boards }) => ({ ...state, boards })),
  on(boardActions.deleteBoard, (state, { id }) => {
    const result = [];
    for (const board of state.boards) {
      if (board.id !== id) {
        result.push(board);
      }
    }
    return {
      ...state,
      boards: result,
    };
  }),
  // @ts-ignore
  on(boardActions.updateBoard, (state, { board }) => {
    const result = [];
    for (const item of state.boards) {
      if (item.id !== board.id) {
        result.push(item);
      } else {
        result.push(board);
      }
    }
    return {
      ...state,
      boards: result,
    };
  }),
  on(boardActions.addError, (state, { error }) => ({ ...state, error })),
  // @ts-ignore
  on(boardActions.clearError, (state, { error }) => ({ ...state, error })),
);

export function boardReducer(state: BoardState, action: Action): BoardState {
  return reducer(state, action);
}
