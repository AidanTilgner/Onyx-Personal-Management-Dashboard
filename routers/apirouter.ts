import { Router } from "express";
import userRouter from "./apiRoutes/users";
import serviceRouter from "../services/router";
import { verifyAPIKey } from "../middleware/auth";

const router = Router();

router.use("/users", userRouter);
router.use("/services", verifyAPIKey, serviceRouter);

export default router;
