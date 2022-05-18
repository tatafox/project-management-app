import { IBoardDetail } from '../shared/models/board.model';

export interface BoardState {
  boards: IBoardDetail[];
  error: Error;
}

export const initialBoardState: BoardState = {
  // @ts-ignore
  boards: [],
  // @ts-ignore
  error: null,
};

export interface AppState {
  boardState: BoardState;
}
