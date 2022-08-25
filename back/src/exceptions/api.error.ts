export default class  ApiError extends Error {
  status;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
  static BadRequest(message: string) {
    return new ApiError(400, message)
  }
  static UnauthorizedError() {
    return new ApiError(401, 'User not authorized');
  }
  static Forbidden(message: string) {
    return new ApiError(403, message);
  }
  static NotFound(message: string) {
    return new ApiError(404, message)
  }
  static AlreadyExists(message: string) {
    return new ApiError(409, message)
  }
  static Internal(message: string) {
    return new ApiError(500, message)
  }
}
