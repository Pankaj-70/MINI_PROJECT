class ApiError extends Error {
  constructor(statusCode, message = "Something is wrong", errors = [], stack) {
    super(message);
    this.success = false;
    this.data = message;
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
