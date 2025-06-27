import { Request, Response } from "express";
import { commentService } from "../services";
import { asyncHandler } from "../middlewares";
import { response } from "../utils";

class CommentController {
  handleAddComment = asyncHandler(async (req: Request, res: Response) => {
    const comment = await commentService.addCommentToLead(
      req.params.leadId,
      req.body.authorId,
      req.body.commentText
    );
    response(res, 201, { comment });
  });
  
  handleGetComments = asyncHandler(async (req: Request, res: Response) => {
    const comments = await commentService.getCommentsForLead(req.params.leadId);
    response(res, 200, { comments });
  });
}

export default new CommentController();
