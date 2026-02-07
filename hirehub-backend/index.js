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
        ],
        credentials: true,
    })
);

await setupTheDatabase();

app.use("/api", jobRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
});
