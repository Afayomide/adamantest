"use client";
import { FC, useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import MessageList from '../../../../components/messageList';
import MessageInput from '../../../../components/messageInput';
import { Button } from '@mui/material';
import { API_URL } from '../../(home)/page';
import { Conversation, Message } from '@/components/types';
import { useConversations } from '@/context/conversationContext';

const ConversationPage: FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false)
  const {setConversations} = useConversations()

  useEffect(() => {
    if (id) {
      axios
        .get<Message[]>(`${API_URL}/messages/${id}`)
        .then((response) => {
          setMessages(response.data);
          setLoading(false);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleSendMessage = async (text: string) => {
    if (id) {
      setSending(true)
      try {
        const response = await axios.post<Message>(`${API_URL}/messages/${id}`, { text, isUser: true });
        
        setMessages((prev:Message[]) => [...prev, response.data]);
  
        setTimeout(async () => {
          const botMessage = {
            text: "This is an AI generated response",
            isUser: false,
            createdAt: new Date().toISOString(),
            
          };
  
          setMessages((prev:Message[]) => [...prev, botMessage]);
  
          try {
            await axios.post(`${API_URL}/messages/${id}`, botMessage);
            const localEmail = localStorage.getItem("email") 
            const response = await axios.get<Conversation[]>(`${API_URL}/conversations/${localEmail}`);
            setConversations(response.data);


          } catch (error) {
            console.error("Error sending bot message:", error);
          }
          finally{
            setSending(false)
          }
        }, 2000); 
      } catch (error) {
        console.error("Error sending user message:", error);
      } 
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
        <h1 className="text-xl">Chatbot Conversation</h1>
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

      <MessageInput onSend={handleSendMessage} disabled={sending} /> 
    </div>
  );
};

export default ConversationPage;
