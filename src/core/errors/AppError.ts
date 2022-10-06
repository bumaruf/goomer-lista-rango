export class AppError {
  public readonly message: string | string[];
  public readonly statusCode: number;
  public readonly errorCode?: string;

  constructor(
    message: string | string[],
    statusCode = 400,
    errorCode?: string,
  ) {
    this.message = message;
    this.statusCode = statusCode;

    if (errorCode) {
      this.errorCode = errorCode;
    }
  }
}
