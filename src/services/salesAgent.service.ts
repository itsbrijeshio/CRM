import { SalesAgent } from "../models";
import { ApiError } from "../utils";

interface SalesAgentProps {
  name: string;
  email: string;
}

class SalesAgentService {
  private sanitize(agent: any) {
    const { __v, ...rest } = agent;
    return rest;
  }

  // Check if email already exists in the system
  private async isEmailExists(email: string): Promise<boolean> {
    const existing = await SalesAgent.findOne({ email });
    return !!existing;
  }

  // Create a new sales agent
  async createAgent({ name, email }: SalesAgentProps) {
    if (await this.isEmailExists(email)) {
      throw new ApiError(
        409,
        `Sales agent with email '${email}' already exists.`
      );
    }

    const newAgent = await SalesAgent.create({ name, email });
    return this.sanitize(newAgent.toJSON());
  }

  // Fetch all sales agents
  async getAllAgents() {
    const agents = await SalesAgent.find({}, "-__v");
    return agents.map((agent) => this.sanitize(agent.toJSON()));
  }
}

export default new SalesAgentService();
