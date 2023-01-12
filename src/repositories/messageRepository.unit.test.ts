import { beforeEach, describe, expect, jest, it } from "@jest/globals";
import { Message } from "../types/messageTypes";
import MessageRepository from "./messageRepository";

const mockQuery = jest.fn();

jest.mock("../database/database", () => {
  return jest.fn().mockImplementation(() => {
    return {
      query: mockQuery,
    };
  });
});

describe("Message repository tests", () => {
  let repo: MessageRepository;
  beforeEach(() => {
    repo = new MessageRepository();
    mockQuery.mockClear();
  });

  it("create", async () => {
    const expectedMessage = {
      id: "123",
      threadId: "321",
      message: "123",
      dateTimeCreated: new Date(),
    } as Message;

    mockQuery.mockReturnValueOnce(expectedMessage);

    const result = await repo.create(
      expectedMessage.threadId,
      expectedMessage.message
    );

    expect(result).toBe(expectedMessage);
  });

  it("deleteById", async () => {
    await repo.deleteById("id");

    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining("DELETE FROM messages")
    );
  });

  it("deleteByThreadId", async () => {
    await repo.deleteByThreadId("1234");

    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining("DELETE FROM messages")
    );
  });

  it("getByThreadId", async () => {
    const expectedMessages = [
      {
        id: "123",
        threadId: "321",
        message: "123",
        dateTimeCreated: new Date(),
      },
    ] as Message[];

    mockQuery.mockReturnValueOnce(expectedMessages);

    const result = await repo.getByThreadId(expectedMessages[0].threadId);

    expect(result).toBe(expectedMessages);
  });
});
