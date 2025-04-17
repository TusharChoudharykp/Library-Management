import { StatusCodes } from "http-status-codes";

const info = (_req: any, res: any) => {
  return res.status(StatusCodes.OK).json({
    success: true,
    message: "API is live",
    error: {},
    data: {},
  });
};

export default { info };
