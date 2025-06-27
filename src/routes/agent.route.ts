import { Router } from "express";
import { salesAgentController } from "../controllers";
import { validateRequest } from "../middlewares";
import { createAgentSchema } from "../schemas/agent";

const router = Router();

const { handleCreateAgent, handleGetAgent } = salesAgentController;

router.post("/", validateRequest(createAgentSchema), handleCreateAgent);
router.get("/", handleGetAgent);

export default router;
