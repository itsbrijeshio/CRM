import { Response } from "express";

const response = (res: Response, statusCode: number, rest: any) => {
  const message = rest?.message || "Success";
  const responseData = {
    success: statusCode >= 200 && statusCode < 300,
    statusCode,
    message,
    ...rest,
  };
  res.status(statusCode).json(responseData);
};

export default response;
