import MessageRepository from "../repositories/messageRepository";
import ThreadRepository from "../repositories/threadRepository";
import { Thread } from "../types/threadTypes";

export default class ThreadService {
  private messageRepository;
  private threadRepository;

  constructor() {
    this.messageRepository = new MessageRepository();
    this.threadRepository = new ThreadRepository();
  }

  async createThread(message: string): Promise<Thread> {
    return await this.threadRepository.create(message);
  }

  async getThread(threadId: string): Promise<Thread> {
    return await this.threadRepository.getById(threadId);
  }

  async queryThreads(page: number, limit: number): Promise<Thread[]> {
    return await this.threadRepository.query(page, limit);
  }

  async deleteThread(threadId: string): Promise<void> {
    await this.messageRepository.deleteByThreadId(threadId);
    await this.threadRepository.deleteById(threadId);
  }
}
