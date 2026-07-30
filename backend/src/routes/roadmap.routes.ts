import { Router } from "express";
import { submitQuestionnaire } from "../controllers/roadmap.controller";

const router = Router();

router.post("/roadmap", submitQuestionnaire);

export default router;
