import express, { Router } from "express";
import MessageService from "../services/messageService";

const router = express.Router() as Router;

const messageService = new MessageService();

router.post("/", async (req, res) => {
  await messageService.createMessage(req.body.threadId, req.body.message);
  res.sendStatus(200);
});

router.delete("/", async (req, res) => {
  await messageService.deleteMessage(req.body.id);
  res.sendStatus(200);
});

export default router;
