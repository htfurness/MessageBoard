import express, { Request, Router } from "express";
import ThreadService from "../services/threadService";

const router = express.Router() as Router;

const threadService = new ThreadService();

router.get("/", async (req: Request, res) => {
  await threadService.getThread(req.body.id);
  res.sendStatus(200);
});

router.post("/", async (req, res) => {
  await threadService.createThread(req.body.message);
  res.sendStatus(200);
});

router.delete("/", async (req, res) => {
  await threadService.deleteThread(req.body.id);
  res.sendStatus(200);
});

export default router;
