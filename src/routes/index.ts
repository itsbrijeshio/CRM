import { Router } from "express";
import agentRoute from "./agent.route";
import leadRoute from "./lead.route";
import reportRoute from "./report.route"

const router = Router();

router.use("/agents", agentRoute);
router.use("/leads", leadRoute);
router.use("/report", reportRoute);

export default router;
