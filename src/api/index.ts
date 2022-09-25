import { Router } from "express";
import checkinRouter from "./checkin/router";
import userRouter from "./user/router";

export default (): Router => {
  const app = Router();
  app.use("/checkin", checkinRouter);
  app.use("/user", userRouter);
  return app;
};
