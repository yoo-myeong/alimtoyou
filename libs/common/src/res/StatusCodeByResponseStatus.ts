import { ResponseStatus } from './ResponseStatus'

export const StatusCodeByResponseStatus: { [key in ResponseStatus]: number } = {
  OK: 200,
  BAD_PARAMETER: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
}
