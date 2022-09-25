import { Request, Response, NextFunction, Router } from "express";
import LoggerInstance from "../../loaders/logger";
import { addUserData } from "./controller";

const checkinRouter = Router();
checkinRouter.post("/", handleCheckUser);

async function handleCheckUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await addUserData(req.body.id, req.body.domain);
    if (result.success) {
      res
        .status(result.status)
        .json({ success: true, message: result.message });
    }
  } catch (error) {
    LoggerInstance.error(error);
    next(error);
  }
}
export default checkinRouter;
