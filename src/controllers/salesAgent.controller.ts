import { Request, Response } from "express";
import { salesAgentService } from "../services";
import { asyncHandler } from "../middlewares";
import { response } from "../utils";

class SalesAgentController {
  handleCreateAgent = asyncHandler(async (req: Request, res: Response) => {
    const agent = await salesAgentService.createAgent(req.body);
    response(res, 201, { agent });
  });

  handleGetAgent = asyncHandler(async (req: Request, res: Response) => {
    const agents = await salesAgentService.getAllAgents();
    response(res, 200, { agents });
  });
}

export default new SalesAgentController()