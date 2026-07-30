import cors from "cors";
import express from "express";
import { getHealth } from "./controllers/health.controller";
import { errorHandler } from "./middleware/errorHandler";
import roadmapRoutes from "./routes/roadmap.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/v1/health", getHealth);
app.use("/api/v1", roadmapRoutes);

app.use(errorHandler);

export default app;
