"use client";
import { FC } from 'react';
import { Button, List, ListItem, ListItemText } from '@mui/material';
import { useRouter } from 'next/navigation';
import { MdDelete } from "react-icons/md";


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
    <div className="w-full">
      
      {conversations.length === 0 ? (
        <p className="flex items-center justify-center h-[70vh] text-center w-full text-3xl text-gray-400">
  You have no conversations yet.
</p>      ) : (
        <>
        <h2 className="text-4xl font-semibold mb-4 mt-8"> Your Conversations:</h2>

        <List>
          {conversations.map((conversation) => (
            <ListItem key={conversation.id} className="flex justify-between hover:cursor-pointer">
              <ListItemText
                primary={`Conversation with ${conversation.messages?.length} messages`}
                secondary={
                  conversation.messages?.length > 0
                    ? `Last message: ${conversation.messages[conversation.messages?.length - 1]?.text}`
                    : "No messages yet"
                }
                onClick={() => handleConversationClick(conversation.id)}
              />
              <Button className='!ml-4' onClick={() => onDelete(conversation.id)} color="error" variant="contained">
                <MdDelete />
              </Button>
            </ListItem>
          ))}
        </List>
        </>
      )}
    </div>
  );
}

export default ConversationList;
