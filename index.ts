import "dotenv/config";
import app from "./src/app";
import { connectDB } from "./src/config";

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectDB();
  console.warn(`Server is listening on port ${PORT}`);
});
