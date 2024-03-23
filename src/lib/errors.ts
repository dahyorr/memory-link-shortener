
export class HttpException extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}
 
export class NotFoundException extends HttpException{
  constructor(message: string) {
    super(404, message);
    this.message = message;
  }
}

export class BadRequestException extends HttpException{
  constructor(message: string) {
    super(400, message);
    this.message = message;
  }
}
export class InternalServerErrorException extends HttpException{
  constructor(message?: string) {
    const defaultMessage = 'Something went wrong';
    super(400, message || defaultMessage);
    this.message = message;
  }
}