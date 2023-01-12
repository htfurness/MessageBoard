import { beforeEach, describe, expect, jest, it } from "@jest/globals";
import { Message } from "../types/messageTypes";
import { Thread } from "../types/threadTypes";
import ThreadRepository from "./threadRepository";

const mockQuery = jest.fn();

jest.mock("../database/database", () => {
  return jest.fn().mockImplementation(() => {
    return {
      query: mockQuery,
    };
  });
});

describe("Message repository tests", () => {
  let repo: ThreadRepository;
  beforeEach(() => {
    repo = new ThreadRepository();
    mockQuery.mockClear();
  });

  it("create", async () => {
    const expectedThread = {
      id: "123",
      message: "123",
      dateTimeCreated: new Date(),
      dateTimeUpdated: new Date(),
    } as Thread;

    mockQuery.mockReturnValueOnce(expectedThread);

    const result = await repo.create(expectedThread.message);

    expect(result).toBe(expectedThread);
  });

  it("deleteById", async () => {
    await repo.deleteById("id");

    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining("DELETE FROM threads")
    );
  });

  it("query", async () => {
    const expectedThreads = [
      {
        id: "123",
        message: "123",
        dateTimeCreated: new Date(),
        dateTimeUpdated: new Date(),
      },
    ] as Thread[];

    mockQuery.mockReturnValueOnce(expectedThreads);

    const result = await repo.query(1, 1);

    expect(result).toBe(expectedThreads);
  });

  it("getById", async () => {
    const expectedThread = {
      id: "123",
      message: "123",
      dateTimeCreated: new Date(),
      dateTimeUpdated: new Date(),
    } as Thread;

    mockQuery.mockReturnValueOnce(expectedThread);

    const result = await repo.getById(expectedThread.id);

    expect(result).toBe(expectedThread);
  });
});
