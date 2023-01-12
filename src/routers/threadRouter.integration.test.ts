import { describe, it } from "@jest/globals";
import request from "supertest";
import app from "../app";

describe("Thread Routes Integration Tests", () => {
  it("/thread GET", async () => {
    await request(app).get("/thread").send({ id: "123" }).expect(200);
    // assert payload contains thread
  });

  it("/thread POST", async () => {
    await request(app).post("/thread").send({ message: "123" }).expect(200);
    // assert payload contains created thread
  });

  it("/thread DELETE", async () => {
    await request(app).delete("/thread").send({ id: "123" }).expect(200);
  });
});
