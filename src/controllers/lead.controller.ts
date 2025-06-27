import { Request, Response } from "express";
import { leadService } from "../services";
import { asyncHandler } from "../middlewares";
import { response } from "../utils";

class LeadController {
  handleCreateLead = asyncHandler(async (req: Request, res: Response) => {
    const lead = await leadService.createLead(req.body);
    response(res, 201, { lead });
  });

  handleGetLeads = asyncHandler(async (req: Request, res: Response) => {
    const leads = await leadService.getAllLeads(req.query);
    response(res, 200, { leads });
  });

  handleUpdateLead = asyncHandler(async (req: Request, res: Response) => {
    const lead = await leadService.updateLead(req.params.leadId, req.body);
    response(res, 200, { lead });
  });

  handleDeleteLead = asyncHandler(async (req: Request, res: Response) => {
    const { message } = await leadService.deleteLead(req.params.leadId);
    response(res, 200, { message });
  });

  handleGetLeadsClosedLastWeek = asyncHandler(
    async (req: Request, res: Response) => {
      const leads = await leadService.getLeadsClosedLastWeek();
      response(res, 200, { leads });
    }
  );

  handleGetTotalLeadsInPipeline = asyncHandler(
    async (req: Request, res: Response) => {
      const { totalLeadsInPipeline } =
        await leadService.getTotalLeadsInPipeline();
      response(res, 200, { totalLeadsInPipeline });
    }
  );
}

export default new LeadController();
