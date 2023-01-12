import { Message } from "./messageTypes";

export interface Thread {
  id: string;
  message: string;
  dateTimeCreated: Date;
  dateTimeUpdated: Date;
}

export interface ThreadWithMessages extends Thread {
  messages?: Message[];
}
