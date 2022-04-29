// import { createReducer, on, Action } from '@ngrx/store';
// import * as boardActions from '../actions/board.actions';
// import { BoardState, initialBoardState } from '../state.models';

// const reducer = createReducer(
//   initialBoardState,
//   on(boardActions.addBoard, (state, { board }) => ({
//     ...state,
//     boards: [...state.boards, board],
//   })),
//   on(boardActions.setBoardsList, (state, { boards }) => ({ ...state, boards })),
//   on(boardActions.deleteBoard, (state, { id }) => ({
//     ...state,
//     boards: state.boards.filter((oldBoard) => {
//       oldBoard.id !== id;
//     }),
//   })),
//   // @ts-ignore
//   on(boardActions.updateBoard, (state, { board }) => ({
//     ...state,
//     boards: state.boards.map((oldBoard) => {
//       oldBoard.id === board.id ? board : oldBoard;
//     }),
//   })),
//   on(boardActions.addError, (state, { error }) => ({ ...state, error })),
//   // @ts-ignore
//   on(boardActions.clearError, (state, { error }) => ({ ...state, error })),
// );

// export function boardReducer(state: BoardState, action: Action): BoardState {
//   return reducer(state, action);
// }
