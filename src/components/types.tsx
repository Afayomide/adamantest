export interface Message {
    id?: string;
    conversationId?: string; // Foreign key reference to Conversation
    text: string; // The message content
    isUser: boolean; // Whether the message is from the user or bot
    createdAt: string; // Date in ISO string format
  }

  export interface LocalMessage {
    text: string; // The message content
    isUser: boolean; // Whether the message is from the user or bot
    createdAt: string; // Date in ISO string format
  }
  

export interface Conversation {
    id: string;
    userEmail: string; // Foreign key reference to User
    messages: Message[]; // List of messages in the conversation
    createdAt: string; // Date in ISO string format
  }
  