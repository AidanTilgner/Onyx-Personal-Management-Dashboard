import { Router } from "express";
import userRouter from "./apiRoutes/users";
import serviceRouter from "../services/router";

const router = Router();

router.use("/users", userRouter);
router.use("/services", serviceRouter);

export default router;
