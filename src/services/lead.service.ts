import { Types } from "mongoose";
import { Lead, SalesAgent } from "../models";
import { ApiError } from "../utils";

type LeadInput = {
  name: string;
  source: string;
  salesAgent: string;
  status: string;
  tags?: string[];
  timeToClose: number;
  priority: string;
};

const allowedSources = [
  "Website",
  "Referral",
  "Cold Call",
  "Advertisement",
  "Email",
  "Other",
];
const allowedStatuses = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Closed",
];

class LeadService {
  private sanitize(lead: any) {
    const { __v, ...rest } = lead;
    return rest;
  }

  private async getAgentIfExists(agentId: string) {
    const agent = await SalesAgent.findById(agentId);
    if (!agent) {
      throw new ApiError(404, `Sales agent with ID '${agentId}' not found.`);
    }
    return agent;
  }

  async createLead(input: LeadInput) {
    await this.getAgentIfExists(input.salesAgent);

    const lead = await Lead.create(input);
    const populated = await lead.populate("salesAgent", "id name");

    return this.sanitize(populated.toJSON());
  }

  async getAllLeads(filters: {
    salesAgent?: string;
    status?: string;
    tags?: string[];
    source?: string;
  }) {
    const query: any = {};

    if (filters.salesAgent) {
      if (!Types.ObjectId.isValid(filters.salesAgent)) {
        throw new ApiError(
          400,
          "Invalid input: 'salesAgent' must be a valid ObjectId."
        );
      }
      query.salesAgent = filters.salesAgent;
    }

    if (filters.status) {
      if (!allowedStatuses.includes(filters.status)) {
        throw new ApiError(
          400,
          `Invalid input: 'status' must be one of ${JSON.stringify(
            allowedStatuses
          )}.`
        );
      }
      query.status = filters.status;
    }

    if (filters.source) {
      if (!allowedSources.includes(filters.source)) {
        throw new ApiError(
          400,
          `Invalid input: 'source' must be one of ${JSON.stringify(
            allowedSources
          )}.`
        );
      }
      query.source = filters.source;
    }

    if (filters.tags && Array.isArray(filters.tags)) {
      query.tags = { $all: filters.tags };
    }

    const leads = await Lead.find(query)
      .populate("salesAgent", "id name")
      .select("-__v");
    return leads.map((lead) => this.sanitize(lead.toJSON()));
  }

  async updateLead(id: string, input: LeadInput) {
    if (input.salesAgent) {
      await this.getAgentIfExists(input.salesAgent);
    }

    const lead = await Lead.findByIdAndUpdate(id, input, {
      new: true,
      runValidators: true,
    }).populate("salesAgent", "id name");

    if (!lead) {
      throw new ApiError(404, `Lead with ID '${id}' not found.`);
    }

    return this.sanitize(lead.toJSON());
  }

  async deleteLead(id: string) {
    const lead = await Lead.findByIdAndDelete(id);
    if (!lead) {
      throw new ApiError(404, `Lead with ID '${id}' not found.`);
    }

    return { message: "Lead deleted successfully." };
  }

   async getLeadsClosedLastWeek() {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const closedLeads = await Lead.find({
      status: 'Closed',
      closedAt: { $gte: sevenDaysAgo },
    })
      .populate('salesAgent', 'name')
      .sort({ closedAt: -1 });

    return closedLeads.map(lead => ({
      id: lead._id.toString(),
      name: lead.name,
      salesAgent: (lead.salesAgent as any).name,
      closedAt: lead.closedAt,
    }));
  }

  async getTotalLeadsInPipeline() {
    const count = await Lead.countDocuments({ status: { $ne: 'Closed' } });
    return { totalLeadsInPipeline: count };
  }
}

export default new LeadService();
