import { randomUUID } from "crypto";
import Database from "../database/database";
import { Thread } from "../types/threadTypes";

export default class ThreadRepository {
  private database;

  constructor() {
    this.database = new Database();
  }

  async getById(threadId: string): Promise<Thread> {
    const sql = `
            SELECT * FROM threads
            WHERE id = ${threadId}
          `;

    const result = await this.database.query(sql);

    return result as Thread;
  }

  async query(page: number, limit: number): Promise<Thread[]> {
    const sql = `
            SELECT * FROM threads
            LIMIT ${limit}
            OFFSET ${limit * page}
          `;

    const result = await this.database.query(sql);

    return result as Thread[];
  }

  async create(message: string): Promise<Thread> {
    const sql = `
        INSERT INTO threads(
            id, message, dateTimeCreated, dateTimeUpdated
        )
        VALUES(
            '${randomUUID()}',  '${message}', ${new Date()}, ${new Date()}
        );
    `;

    const result = await this.database.query(sql);

    return result as Thread;
  }

  async deleteById(threadId: string): Promise<void> {
    const sql = `
              DELETE FROM threads
              WHERE threadId = '${threadId}'
          `;

    await this.database.query(sql);
  }
}
