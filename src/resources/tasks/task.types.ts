interface IRequestParamsTask {
  boardId: string;
  taskId: string;
}

interface ITaskDataFromRequestBody {
  title: string;
  order: number;
  description: string;
  userId: string | null;
  columnId: string | null;
}

interface ITaskDataFromRequest extends ITaskDataFromRequestBody {
  boardId: string | null;
}

interface ITask extends ITaskDataFromRequest {
  id: string;
}

export {
  IRequestParamsTask,
  ITask,
  ITaskDataFromRequest,
  ITaskDataFromRequestBody,
};
