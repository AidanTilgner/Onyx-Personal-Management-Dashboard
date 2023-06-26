import { Router } from "express";
import notesRouter from "./routers/notes";

const router = Router();

router.use("/notes", notesRouter);

export default router;
