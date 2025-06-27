import zod from "zod";

const name = zod
  .string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  })
  .min(3, "Name must be at least 3 characters long")
  .max(30, "Name must be at most 30 characters long");

const email = zod
  .string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  })
  .email({
    message: "Invalid email format",
  });

const createAgentSchema = zod
  .object({
    name,
    email,
  })
  .strict();

export { createAgentSchema };
