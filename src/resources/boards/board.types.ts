import { IColumn } from '../columns/column.types';

interface IBoardDataFromRequestBody {
  title: string;
  columns: Array<IColumn>;
}
interface IBoard extends IBoardDataFromRequestBody {
  id: string;
}

export { IBoard, IBoardDataFromRequestBody };
