import { Router } from "express";
import { leadController } from "../controllers";
import { validateRequest } from "../middlewares";
import { createLeadSchema, updateLeadSchema } from "../schemas/lead";
import commentRoute from "./comment.route";

const router = Router();

const { handleCreateLead, handleGetLeads, handleUpdateLead, handleDeleteLead } =
  leadController;

const idValidator = validateRequest.id("leadId", "params", "Lead");

router.post("/", validateRequest(createLeadSchema), handleCreateLead);
router.get("/", handleGetLeads);
router.put(
  "/:leadId",
  idValidator,
  validateRequest(updateLeadSchema),
  handleUpdateLead
);
router.delete("/:leadId", idValidator, handleDeleteLead);

// Comments
router.use("/", commentRoute);

export default router;
