import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (err: { message: any; stack: any; }, req: Request, res: { statusCode: number; status: (arg0: any) => void; json: (arg0: { message: any; stack: any; }) => void; }, next: any) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: err.stack,
  });
}

export {
  globalErrorHandler
}