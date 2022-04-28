import { createReducer, on, Action } from '@ngrx/store';
import * as boardActions from '../actions/board.actions';
import { BoardState, initialBoardState } from '../state.models';

const reducer = createReducer(
  initialBoardState,
  on(boardActions.addBoard, (state, { board }) => {
    return { ...state, boards: [...state.boards, board] };
  }),
  on(boardActions.setBoardsList, (state, { boards }) => {
    return { ...state, boards };
  }),
  on(boardActions.deleteBoard, (state, { id }) => {
    return {
      ...state,
      boards: state.boards.filter((oldBoard) => {
        oldBoard.id !== id;
      }),
    };
  }),
  // @ts-ignore
  on(boardActions.updateBoard, (state, { board }) => {
    return {
      ...state,
      boards: state.boards.map((oldBoard) => {
        oldBoard.id === board.id ? board : oldBoard;
      }),
    };
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
