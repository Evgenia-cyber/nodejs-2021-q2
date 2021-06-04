interface IRequestParamsUser {
  userId: string;
}

interface IUserDataFromRequestBody {
  name: string;
  login: string;
  password: string;
}

interface IUser extends IUserDataFromRequestBody {
  id: string;
}

interface IUserForResponse {
  id: string;
  name: string;
  login: string;
}

export {
  IRequestParamsUser,
  IUserForResponse,
  IUser,
  IUserDataFromRequestBody,
};
