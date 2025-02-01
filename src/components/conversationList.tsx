"use client";
import { FC } from 'react';
import { Button, List, ListItem, ListItemText } from '@mui/material';
import { useRouter } from 'next/navigation';

interface Conversation {
  id: string;
  createdAt: string;
  messages: { text: string; isUser: boolean }[];
}

interface ConversationListProps {
  conversations: Conversation[];
  onDelete: (id: string) => void;
}

const ConversationList: FC<ConversationListProps> = ({ conversations, onDelete }) => {
  const router = useRouter();

  const handleConversationClick = (conversationId: string) => {
    router.push(`/conversation/${conversationId}`);
  };

  return (
    <div className="w-full max-w-xs">
      <h2 className="text-xl font-semibold mb-4">Conversations</h2>
      <List>
        {conversations.map((conversation) => (
          <ListItem key={conversation.id} className="flex justify-between">
            <ListItemText
              primary={`Conversation with ${conversation.messages?.length} messages`}
              secondary={
                conversation.messages?.length > 0
                  ? `Last message: ${conversation.messages[conversation.messages?.length - 1]?.text}`
                  : "No messages yet"
              }              onClick={() => handleConversationClick(conversation.id)}
            />
            <Button onClick={() => onDelete(conversation.id)} color="error" variant="contained">
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ConversationList;
