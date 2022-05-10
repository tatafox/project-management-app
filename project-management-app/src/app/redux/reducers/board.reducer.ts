/* eslint-disable no-restricted-syntax */
import { createReducer, on, Action } from '@ngrx/store';
import * as boardActions from '../actions/board.actions';
import { BoardState, initialBoardState } from '../state.models';
import {
  IBoardDetail,
  IColumnList,
  ITask,
} from '../../shared/models/board.model';
import { map } from 'rxjs';

const reducer = createReducer(
  initialBoardState,
  on(boardActions.addBoard, (state, { board }) => ({
    ...state,
    boards: [...state.boards, board],
  })),
  on(boardActions.setBoardsList, (state, { boards }) => {
    const newBoards = JSON.parse(JSON.stringify(boards)) as IBoardDetail[];
    newBoards.forEach((board) => {
      board.columns.sort((a, b) => a.order - b.order);
      board.columns.forEach((column) =>
        column.tasks.sort((a, b) => a.order - b.order),
      );
      return board;
    });
    return { ...state, boards: newBoards };
  }),
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
  on(boardActions.deleteColumn, (state, { boardID, columnDeleteID }) => {
    const result: IBoardDetail[] = [];
    state.boards.forEach((board) => {
      if (board.id === boardID) {
        const boardUpdate = JSON.parse(JSON.stringify(board)) as IBoardDetail;
        const newColumns: IColumnList[] = [];
        boardUpdate.columns.forEach((column) => {
          if (column.id !== columnDeleteID) {
            newColumns.push(column);
          }
        });
        boardUpdate.columns = newColumns;
        result.push(boardUpdate);
      } else {
        result.push(board);
      }
    });
    return {
      ...state,
      boards: result,
    };
  }),
  on(boardActions.updateColumn, (state, { boardID, columnUpdate }) => {
    const result: IBoardDetail[] = [];
    state.boards.forEach((board) => {
      if (board.id === boardID) {
        const boardUpdate = JSON.parse(JSON.stringify(board)) as IBoardDetail;
        const newColumns: IColumnList[] = [];
        boardUpdate.columns.forEach((column) => {
          if (column.id !== columnUpdate.id) {
            newColumns.push(column);
          } else {
            newColumns.push(columnUpdate);
          }
        });
        boardUpdate.columns = newColumns;
        result.push(boardUpdate);
      } else {
        result.push(board);
      }
    });
    return {
      ...state,
      boards: result,
    };
  }),
  on(boardActions.updateTask, (state, { boardID, columnID, taskID, task }) => {
    const result = [];
    for (const item of state.boards) {
      if (item.id !== boardID) {
        result.push(item);
      } else {
        const board = JSON.parse(JSON.stringify(item)) as IBoardDetail;
        const currentColumn = board.columns.filter(
          (col) => col.id === columnID,
        )[0];
        if (!taskID) {
          currentColumn.tasks.push(task);
        } else {
          const taskList: ITask[] = [];
          currentColumn.tasks.forEach((item) => {
            if (!!item && item.id !== taskID) taskList.push(item);
          });
          taskList.push(task);
          taskList.sort((a, b) => a.order - b.order);
          currentColumn.tasks = taskList;
        }
        result.push(board);
      }
    }
    return {
      ...state,
      boards: result,
    };
  }),
  on(boardActions.deleteTask, (state, { boardID, columnID, taskDeleteID }) => {
    state.boards.forEach((board) => {
      if (board.id === boardID) {
        board.columns.forEach((column) => {
          if (column.id === columnID) {
            const task: ITask[] = [];
            column.tasks.forEach((item) => {
              if (!!item && item.id !== taskDeleteID) task.push(item);
            });
            column.tasks = task;
          }
        });
      }
    });
    return {
      ...state,
      boards: state.boards,
    };
  }),
  on(boardActions.addError, (state, { error }) => ({ ...state, error })),
  // @ts-ignore
  on(boardActions.clearError, (state, { error }) => ({ ...state, error })),
);

export function boardReducer(state: BoardState, action: Action): BoardState {
  return reducer(state, action);
}
