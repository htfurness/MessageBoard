import { describe, it } from "@jest/globals";
import request from "supertest";
import app from "../app";

describe("Message Routes Integration Tests", () => {
  it("/message POST", async () => {
    await request(app)
      .post("/message")
      .send({ threadId: "123", message: "message" })
      .expect(200);
    // assert payload contains created message
  });

  it("/message DELETE", async () => {
    await request(app).delete("/message").send({ threadId: "123" }).expect(200);
  });
});
