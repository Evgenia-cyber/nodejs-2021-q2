import { IColumn } from '../columns/column.types';

interface IRequestParamsBoard {
  boardId: string;
}

interface IBoardDataFromRequestBody {
  title: string;
  columns: Array<IColumn>;
}

interface IBoard extends IBoardDataFromRequestBody {
  id: string;
}

export { IRequestParamsBoard, IBoard, IBoardDataFromRequestBody };
