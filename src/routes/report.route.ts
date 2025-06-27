import { Router } from "express";
import { leadController } from "../controllers";

const router = Router();

const { handleGetLeadsClosedLastWeek, handleGetTotalLeadsInPipeline } =
  leadController;

router.get("/last-week", handleGetLeadsClosedLastWeek);
router.get("/pipeline", handleGetTotalLeadsInPipeline);

export default router;
