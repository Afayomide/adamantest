"use client";
import { FC } from "react";
import { Paper } from "@mui/material";

interface Message {
  text: string;
  isUser: boolean;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="p-4 space-y-2">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
        >
          <Paper
            elevation={3}
            className={`p-3 rounded-lg max-w-xs ${
              message.isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
            }`}
          >
            {message.text}
          </Paper>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
