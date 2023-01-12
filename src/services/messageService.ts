import MessageRepository from "../repositories/messageRepository";
import { Message } from "../types/messageTypes";

export default class MessageService {
  private messageRepository;

  public constructor() {
    this.messageRepository = new MessageRepository();
  }

  async createMessage(threadId: string, message: string): Promise<Message> {
    return await this.messageRepository.create(threadId, message);
  }

  async deleteMessage(threadId: string): Promise<void> {
    return await this.messageRepository.deleteById(threadId);
  }

  async deleteMessagesForThread(threadId: string): Promise<void> {
    return await this.messageRepository.deleteByThreadId(threadId);
  }
}
