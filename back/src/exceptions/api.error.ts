module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status: number, message: string, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'User not authorized');
    }

    static BadRequest(message: string, errors = []) {
        return new ApiError(404, message, errors);
    }
    static Internal(message: string, errors = []) {
        return new ApiError(500, message, errors)
    }

    static Forbidden(message: string, errors = []) {
        return new ApiError(403, message, errors)
    }
}
