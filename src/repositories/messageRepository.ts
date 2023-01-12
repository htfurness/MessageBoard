import { randomUUID } from "crypto";
import Database from "../database/database";
import { Message } from "../types/messageTypes";

export default class MessageRepository {
  private database;

  constructor() {
    this.database = new Database();
  }

  async create(threadId: string, message: string): Promise<Message> {
    const sql = `
            INSERT INTO messages(
                id, threadId, message, dateTimeCreated
            )
            VALUES(
                '${randomUUID()}', '${threadId}',  '${message}', ${new Date()}
            );
        `;

    const result = await this.database.query(sql);

    return result as Message;
  }

  async deleteById(messageId: string): Promise<void> {
    const sql = `
            DELETE FROM messages
            WHERE id = '${messageId}'
        `;

    await this.database.query(sql);
  }

  async deleteByThreadId(threadId: string): Promise<void> {
    const sql = `
            DELETE FROM messages
            WHERE threadId = '${threadId}'
        `;

    await this.database.query(sql);
  }

  async getByThreadId(threadId: string): Promise<Message[]> {
    const sql = `
            SELECT * FROM messages
            WHERE threadId = '${threadId}'
        `;

    const result = await this.database.query(sql);

    return result as Message[];
  }
}
