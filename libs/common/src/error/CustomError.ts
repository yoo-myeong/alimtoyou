import { plainToInstance } from 'class-transformer'
import { ResponseStatus } from '../res/ResponseStatus'
import { CustomErrorLog } from './CustomErrorLog'

export class CustomError extends Error {
  private static readonly errorName = 'CustomError'

  constructor(
    private readonly _status: ResponseStatus,
    private readonly _message: string,
    private readonly _error?: Error,
  ) {
    super(_message)
    this.name = CustomError.errorName
  }

  get status() {
    return this._status
  }

  get error() {
    return this._error
  }

  static isCustomError(err: Error): err is CustomError {
    return err.name === CustomError.errorName
  }

  toErrorLog() {
    return plainToInstance(CustomErrorLog, {
      name: this.name,
      message: this.message,
      stack: this.stack,
      status: this.status,
    })
  }
}
