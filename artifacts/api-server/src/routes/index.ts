import { Router, type IRouter } from "express";
import healthRouter from "./health";
import paymentRouter from "./payment";
import stockRouter from "./stock";
import adminRouter from "./admin";
import catalogRouter from "./catalog";
import storageRouter from "./storage";

const router: IRouter = Router();

router.use(healthRouter);
router.use(storageRouter);
router.use("/catalog", catalogRouter);
router.use("/payment", paymentRouter);
router.use("/stock", stockRouter);
router.use("/admin", adminRouter);

export default router;
