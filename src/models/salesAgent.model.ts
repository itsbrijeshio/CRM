import mongoose from "mongoose";

// SalesAgentSchema
const salesAgentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Sales Agent name is required"],
  },
  email: {
    type: String,
    required: [true, "Sales Agent email is required"],
    unique: true, // Email must be unique across agents
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("SalesAgent", salesAgentSchema);
