import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

export function OK(
  res: Response,
  message: string,
  data: any = {},
  status: HttpStatus = HttpStatus.OK,
) {
  return res.status(status).json({
    statusCode: status,
    message,
    data,
  });
}

export function errorHandler(error: any, res: Response) {
  console.error("Error:\n", error);
  const status = error?.status;
  const message = error?.message;
  return res.status(status).json({
    ...(status && { statusCode: status }),
    ...(message && { message }),
  });
}
