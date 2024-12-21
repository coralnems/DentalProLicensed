export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number = 400
  ) {
    super(message);
    this.name = 'AppError';
  }

  static BadRequest(message: string) {
    return new AppError(message, 'BAD_REQUEST', 400);
  }

  static Unauthorized(message: string = 'Unauthorized') {
    return new AppError(message, 'UNAUTHORIZED', 401);
  }

  static NotFound(message: string = 'Resource not found') {
    return new AppError(message, 'NOT_FOUND', 404);
  }

  static ServerError(message: string = 'Internal server error') {
    return new AppError(message, 'SERVER_ERROR', 500);
  }
}