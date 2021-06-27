export enum StatusCode {
  OK = 200,
  CREATED = 201,
  DELETED = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZET = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum Messages {
  BAD_REQUEST = 'Bad request',
  NOT_FOUND = 'not found',
  INTERNAL_SERVER_ERROR = 'Internal server error',
  UNAUTHORIZET = 'Unauthorized',
  FORBIDDEN = 'Forbidden',
}
