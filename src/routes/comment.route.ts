import { Router } from "express";
import { commentController } from "../controllers";
import { validateRequest } from "../middlewares";

const router = Router();

const { handleAddComment, handleGetComments } = commentController;

const idValidator = validateRequest.id("leadId", "params", "Lead");

router.post("/:leadId/comments", idValidator, handleAddComment);
router.get("/:leadId/comments", idValidator, handleGetComments);

export default router;
