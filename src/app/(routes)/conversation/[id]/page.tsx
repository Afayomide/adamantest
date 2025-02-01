"use client";
import { FC, useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import MessageList from '../../../../components/messageList';
import MessageInput from '../../../../components/messageInput';
import { Button } from '@mui/material';
import { API_URL } from '../../(home)/page';

const ConversationPage: FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios
        .get(`${API_URL}/messages/${id}`)
        .then((response:any) => {
          setMessages(response.data);
          setLoading(false);
          console.log(response.data)
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleSendMessage = (text: string) => {
    if (id) {
      axios
        .post(`${API_URL}/messages/${id}`, { text, isUser: true })
        .then((response) => {
          const botMessage = {
            text: "This is a chatbot.",
            isUser: false,
            createdAt: new Date().toISOString(),
          };         
           setMessages((prev) => [...prev, response.data]);

          return axios.post(`${API_URL}/messages/${id}`, botMessage);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleDeleteConversation = () => {
    if (id) {
      axios
        .delete(`${API_URL}/conversations/${id}`)
        .then(() => router.push('/'))
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1 className="text-xl">Conversation {id}</h1>
        <Button variant="contained" color="error" onClick={handleDeleteConversation}>
          Delete Conversation
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <MessageList messages={messages} />
        )}
      </div>

      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default ConversationPage;
