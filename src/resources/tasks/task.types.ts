interface ITaskDataFromRequestBody {
  title: string;
  order: number;
  description: string;
  userId: string | null | undefined;
  columnId: string | null | undefined;
}

interface ITaskDataFromRequest extends ITaskDataFromRequestBody {
  boardId: string | null | undefined;
}

interface ITask extends ITaskDataFromRequest {
  id: string;
}

export { ITask, ITaskDataFromRequest, ITaskDataFromRequestBody };
