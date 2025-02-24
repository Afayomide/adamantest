'use client'
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Conversation } from "@/components/types";
import { API_URL } from "@/components/apiurl";

interface ConversationContextType {
  conversations: Conversation[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>
  loading: boolean;
  setLoading: (loading: boolean) => void;
  user: boolean;
  setUser: (user:boolean) => void;
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export const ConversationProvider = ({ children }: { children: React.ReactNode }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<boolean>(false)
  let localEmail: string | null = null;
  if (typeof window !== "undefined") {
    localEmail = localStorage.getItem("email");
   
  }

  useEffect(() => { 
   
    if (!localEmail) return;
 if (localEmail){
      setUser(true)
    }
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
    <ConversationContext.Provider value={{ conversations, setConversations,setLoading, loading, user, setUser }}>
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
