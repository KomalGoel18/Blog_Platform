import express from "express";
import postRoutes from "./routes/post.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

app.use("/api/posts", postRoutes);

app.use(errorMiddleware);

export default app;
