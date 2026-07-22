import { Router, type IRouter } from "express";
import healthRouter from "./health";
import paymentRouter from "./payment";
import stockRouter from "./stock";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/payment", paymentRouter);
router.use("/stock", stockRouter);

export default router;
