import { HttpException } from '@nestjs/common';

export class FeelingNotFoundExceptions extends HttpException{
  constructor() {
    super("feeling not found",404);
  }
}

export class FeelingExistsExceptions extends HttpException{
  constructor() {
    super("feeling already exist",400);
  }
}