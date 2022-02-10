class HttpError extends Error {
  constructor(status_code, message) {
    super(message);
    this.status_code = status_code;
    this.error_type;

    if (typeof message === 'string') {
      this.error_type = 'string';
    }

    if (Array.isArray(message)) {
      this.error_type = 'array';
    }
  }
}

module.exports = HttpError;
