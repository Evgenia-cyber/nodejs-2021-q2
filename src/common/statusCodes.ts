enum StatusCode {
  'OK' = 200,
  'CREATED' = 201,
  'DELETED' = 204,
  'BAD_REQUEST' = 400,
  'NOT_FOUND' = 404,
}

enum Messages {
  'BAD_REQUEST' = 'Bad request',
  'NOT_FOUND' = 'Not found',
}

export { StatusCode, Messages };
