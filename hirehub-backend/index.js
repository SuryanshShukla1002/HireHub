import express from "express";
import cors from "cors";
import { setupTheDatabase } from './database/db.connection.js';
import jobRouter from './routes/job.route.js';

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://hire-hub-olive-ten.vercel.app"
        ],
        credentials: true,
    })
);

await setupTheDatabase();

app.use("/api", jobRouter);

export default app; 
