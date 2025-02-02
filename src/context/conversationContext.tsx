'use client'
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { API_URL } from "@/app/(routes)/(home)/page";
import { Conversation } from "@/components/types";


interface ConversationContextType {
  conversations: Conversation[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export const ConversationProvider = ({ children }: { children: React.ReactNode }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState<boolean>(true)
  const localEmail = localStorage.getItem("email") 

  useEffect(() => {
    if (!localEmail) return;

    const fetchConversations = async () => {
      const conversationPromise = new Promise<void>(async (resolve, reject) => {
        try {
          console.log("Fetching conversations for:", localEmail);
          const response = await axios.get<Conversation[]>(`${API_URL}/conversations/${localEmail}`);
          
          console.log(response.data);
          setConversations(response.data);
          resolve();
          setLoading(false)
        } catch (error) {
          console.error("Error fetching conversations:", error);
          reject(error);
        }
      });

      toast.promise(conversationPromise, {
        loading: "Fetching conversations...",
        success: "Conversations loaded successfully",
        error: "Failed to load conversations",
      });
    };

    fetchConversations();
  }, [localEmail]);

  return (
    <ConversationContext.Provider value={{ conversations, setConversations,setLoading, loading }}>
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversations = () => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error("useConversations must be used within a ConversationProvider");
  }
  return context;
};
