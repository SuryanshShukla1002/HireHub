import express from "express";
import Job from '../models/job.connection.js';

const router = express.Router();

router.post("/job", async (req, res) => {
    try {
        const addJob = await Job.create(req.body);
        res.status(201).json(addJob);
    } catch (error) {
        res.status(500).json({ message: "Internal server Error" });
    }
});

router.get("/job", async (req, res) => {
    try {
        const allJob = await Job.find();
        res.status(200).json(allJob);
    } catch (error) {
        res.status(500).json({ message: "Unable to get the Job details" });
    }
});

router.get("/job/:id", async (req, res) => {
    try {
        const jobById = await Job.findById(req.params.id);
        if (!jobById) {
            return res.status(404).json({ message: "Unable to get data" });
        }
        res.status(200).json(jobById);
    } catch (error) {
        res.status(500).json({ message: "Failed to get specific job detail" });
    }
});

router.delete("/job/:jobId", async (req, res) => {
    try {
        const removeit = await Job.findByIdAndDelete(req.params.jobId);
        if (!removeit) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json({ message: "Successfully deleted the Job detail" });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch the data" });
    }
});

export default router;