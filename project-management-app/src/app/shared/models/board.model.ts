export interface IBoard {
  id: string;
  title: string;
  description: string;
}

export interface IBoardBody {
  title: string;
  description: string;
}

export interface IBoardDetail {
  id: string;
  title: string;
  description: string;
  columns: IColumnList[];
}

export interface IColumn {
  id: string;
  title: string;
  order: number;
}

export interface IColumnList {
  id: string;
  title: string;
  order: number;
  tasks: ITask[];
}

export interface ITask {
  id: string;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export interface IUpdateTask {
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export interface ITaskBody {
  title: string;
  done: boolean;
  order: number;
  description: string;
  userId: string;
}

export interface TaskDialogData {
  title: string;
  description: string;
  done: boolean;
  editTask?: boolean;
  userId: string;
}
