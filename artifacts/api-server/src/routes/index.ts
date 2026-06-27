import { Router, type IRouter } from "express";
import healthRouter from "./health";
import statsRouter from "./stats";
import sendRouter from "./send";

const router: IRouter = Router();

router.use(healthRouter);
router.use(statsRouter);
router.use(sendRouter);

export default router;
