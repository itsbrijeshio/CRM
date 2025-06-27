import zod from "zod";

const name = zod
  .string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  })
  .min(3, "Name must be at least 3 characters long")
  .max(30, "Name must be at most 30 characters long");

const source = zod.enum(
  ["Website", "Referral", "Cold Call", "Advertisement", "Email", "Other"],
  {
    required_error: "Source is required",
    invalid_type_error: "Source must be a string",
  }
);
const salesAgent = zod.string({
  required_error: "Sales Agent is required",
  invalid_type_error: "Sales Agent must be a string",
});

const status = zod.enum(
  ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"],
  {
    required_error: "Status is required",
    invalid_type_error: "Status must be a string",
  }
);

const timeToClose = zod.number({
  required_error: "Time to Close is required",
  invalid_type_error: "Time to Close must be a number",
});

const tags = zod.array(zod.string()).optional();

const priority = zod.enum(["Low", "Medium", "High"], {
  required_error: "Priority is required",
  invalid_type_error: "Priority must be a string",
});

const closedAt = zod.date({
  required_error: "Closed At is required",
  invalid_type_error: "Closed At must be a date",
});

const createLeadSchema = zod
  .object({
    name,
    source,
    salesAgent,
    status,
    priority,
    timeToClose,
    closedAt:closedAt.optional(),
    tags: tags.optional(),
  })
  .strict();

const updateLeadSchema = zod
  .object({
    name: name.optional(),
    source: source.optional(),
    salesAgent: salesAgent.optional(),
    status: status.optional(),
    priority: priority.optional(),
    timeToClose: timeToClose.optional(),
    closedAt:closedAt.optional(),
    tags: tags.optional(),
  })
  .strict();

export { createLeadSchema, updateLeadSchema };
