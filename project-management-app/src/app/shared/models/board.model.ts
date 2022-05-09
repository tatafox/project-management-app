export interface IBoard {
  id: string;
  title: string;
}

export interface IBoardDetail {
  id: string;
  title: string;
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
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export interface IUpdateTask {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export interface ITaskBody {
  title: string;
  order: number;
  description: string;
  userId: string;
}

export interface TaskDialogData {
  title: string;
  description: string;
  editTask?: boolean;
  userId: string;
}
