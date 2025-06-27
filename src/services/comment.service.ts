import { Types } from "mongoose";
import { Comment, Lead, SalesAgent } from "../models";
import { ApiError } from "../utils";

class CommentService {
  private sanitize(comment: any) {
    const { __v, lead, ...rest } = comment;
    return rest;
  }

  async addCommentToLead(
    leadId: string,
    authorId: string,
    commentText: string
  ) {
    // Check if lead exists
    const lead = await Lead.findById(leadId);
    if (!lead) {
      throw new ApiError(404, `Lead with ID '${leadId}' not found.`);
    }

    // Check if author (sales agent) exists
    const author = await SalesAgent.findById(authorId);
    if (!author) {
      throw new ApiError(404, `Sales agent with ID '${authorId}' not found.`);
    }

    // Create comment
    const comment = await Comment.create({
      lead: leadId,
      author: authorId,
      commentText,
    });

    return {
      _id: comment._id.toString(),
      commentText: comment.commentText,
      author: author.name,
      createdAt: comment.createdAt,
    };
  }

  async getCommentsForLead(leadId: string) {
    const lead = await Lead.findById(leadId);
    
    if (!lead) {
      throw new ApiError(404, `Lead with ID '${leadId}' not found.`);
    }

    const comments = await Comment.find({ lead: leadId })
      .populate("author", "name")
      .sort({ createdAt: 1 }) // optional: oldest to newest
      .select("-__v");

    return comments.map((c) => ({
      _id: c._id.toString(),
      commentText: c.commentText,
      author: c.author as any,
      createdAt: c.createdAt,
    }));
  }
}

export default new CommentService();
