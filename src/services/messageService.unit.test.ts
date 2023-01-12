import MessageService from "./messageService";
import { expect, jest, describe, beforeEach, it } from "@jest/globals";
import { Message } from "../types/messageTypes";

const mockMessageRepo = {
  create: jest.fn(),
  deleteById: jest.fn(),
  deleteByThreadId: jest.fn(),
};

jest.mock("../repositories/messageRepository", () => {
  return jest.fn().mockImplementation(() => {
    return mockMessageRepo;
  });
});

describe("Message Service Tests", () => {
  beforeEach(() => {
    mockMessageRepo.create.mockClear();
    mockMessageRepo.deleteById.mockClear();
    mockMessageRepo.deleteByThreadId.mockClear();
  });

  it("createMessage", async () => {
    const service = new MessageService();
    const threadId = "xcv";
    const message = "message!";
    const createdMessage = {} as Message;
    mockMessageRepo.create.mockImplementation(() => createdMessage);

    const result = await service.createMessage(threadId, message);

    expect(result).toBe(result);
    expect(mockMessageRepo.create).toHaveBeenCalledWith(threadId, message);
  });

  it("deleteMessage", async () => {
    const service = new MessageService();
    const messageId = "wqfqfw";

    await service.deleteMessage(messageId);

    expect(mockMessageRepo.deleteById).toHaveBeenCalledWith(messageId);
  });

  it("deleteMessagesForThread", async () => {
    const service = new MessageService();
    const threadId = "wqfqfw";

    await service.deleteMessagesForThread(threadId);

    expect(mockMessageRepo.deleteByThreadId).toHaveBeenCalledWith(threadId);
  });
});
