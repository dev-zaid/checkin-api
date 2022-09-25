import { Request, Response, NextFunction, Router } from "express";
import LoggerInstance from "../../loaders/logger";
import { validate } from "../../middleware/validate";
import { findUser } from "./controller";
import { userSchema } from "../../helper/models/schema";
import ErrorClass from "../../helper/types/error";

const userRouter = Router();
userRouter.get("/check", handleFindUser);

async function handleFindUser(req: Request, res: Response, next: NextFunction) {
  try {
    var uid = req.query.id;
    const result = await findUser(uid);

    if (result.success) {
      res.status(result.status).json({ ...result.data });
    }
  } catch (error) {
    LoggerInstance.error(error);
    next(error);
  }
}
export default userRouter;
