import ThreadService from "./threadService";
import { expect, jest, describe, beforeEach, it } from "@jest/globals";
import { Thread } from "../types/threadTypes";

const mockThreadRepo = {
  create: jest.fn(),
  query: jest.fn(),
  getById: jest.fn(),
  deleteById: jest.fn(),
};

jest.mock("../repositories/threadRepository", () => {
  return jest.fn().mockImplementation(() => {
    return mockThreadRepo;
  });
});

const mockMessageRepo = {
  deleteByThreadId: jest.fn(),
};

jest.mock("../repositories/messageRepository", () => {
  return jest.fn().mockImplementation(() => {
    return mockMessageRepo;
  });
});

describe("Thread Service Tests", () => {
  let service: ThreadService;

  beforeEach(() => {
    service = new ThreadService();

    mockMessageRepo.deleteByThreadId.mockClear();
    mockThreadRepo.create.mockClear();
    mockThreadRepo.query.mockClear();
    mockThreadRepo.getById.mockClear();
    mockThreadRepo.deleteById.mockClear();
  });

  it("createThread", async () => {
    const message = "message!";
    const createdThread = {} as Thread;
    mockThreadRepo.create.mockImplementation(() => createdThread);

    const result = await service.createThread(message);

    expect(result).toBe(createdThread);
    expect(mockThreadRepo.create).toHaveBeenCalledWith(message);
  });

  it("getThread", async () => {
    const threadId = "wqfqfw";
    const thread = {} as Thread;
    mockThreadRepo.getById.mockImplementation(() => thread);

    const result = await service.getThread(threadId);

    expect(result).toBe(thread);
    expect(mockThreadRepo.getById).toHaveBeenCalledWith(threadId);
  });

  it("queryThreads", async () => {
    const limit = 1;
    const page = 1;
    const threads: Thread[] = [];
    mockThreadRepo.query.mockImplementation(() => threads);

    const result = await service.queryThreads(page, limit);

    expect(result).toBe(threads);
    expect(mockThreadRepo.query).toHaveBeenCalledWith(page, limit);
  });

  it("deleteThread", async () => {
    const threadId = "wqfqfw";

    await service.deleteThread(threadId);

    expect(mockMessageRepo.deleteByThreadId).toHaveBeenCalledWith(threadId);
    expect(mockThreadRepo.deleteById).toHaveBeenCalledWith(threadId);
  });
});
