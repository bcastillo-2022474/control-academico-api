import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./src/db/connection.js";
import userRoutes from "./src/routes/user.routes.js";
import courseRoutes from "./src/routes/course.routes.js";
import enrollmentRoutes from "./src/routes/enrollment.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import cors from "cors";

dotenv.config();

const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  // logger
  const { method, url, body, params, query } = req;
  console.log("-----------------------------------------");
  console.log({ method, url, body, params, query });
  next();
});
app.use("/api/user", userRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/enrollment", enrollmentRoutes);
app.use("/api/auth", authRoutes);

dbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
});
