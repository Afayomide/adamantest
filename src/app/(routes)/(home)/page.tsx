"use client";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import ConversationList from "@/components/conversationList";
import { TextField, Button } from "@mui/material";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { LuBadgePlus } from "react-icons/lu";
import { useConversations } from "@/context/conversationContext";
import { Conversation } from "@/components/types";


export const API_URL = process.env.NEXT_PUBLIC_API_URL;

const HomePage: FC = () => {
  const {conversations, setConversations} = useConversations();
  const [email, setEmail] = useState<string>("");
  const [localEmail, setLocalEmail] = useState<string | null>(null);
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem("email");
      setLocalEmail(storedEmail);
    }
  }, []);
  


  

  const handleDeleteConversation = (id: string) => {
    const deletePromise = new Promise<void>((resolve, reject) => {
      axios
        .delete(`${API_URL}/conversations/${id}`)
        .then(() => {
          setConversations((prev:Conversation[]) => prev.filter((conv) => conv.id !== id));
          resolve();
        })
        .catch(reject);
    });
  
    toast.promise(deletePromise, {
      loading: "Deleting conversation...",
      success: "Conversation deleted successfully",
      error: "Failed to delete conversation",
    });
  };
  
  const handleSend = async () => {
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }
  
    const registerPromise = new Promise<void>(async (resolve, reject) => {
      try {
        await axios.post(`${API_URL}/users/register`, { email });
  
        setEmail("");
        localStorage.setItem("email", email);
        setLocalEmail(email);
  
        resolve();
      } catch (error) {
        console.error("Error creating user:", error);
        reject(error);
      }
    });
  
    toast.promise(registerPromise, {
      loading: "Registering user...",
      success: "User created successfully",
      error: "Failed to create user",
    });
  };
  
  const handleStartConversation = async () => {
    if (!localEmail) {
      toast.error("Please enter your email first.");
      return;
    }
  
    const conversationPromise = new Promise<void>(async (resolve, reject) => {
      try {
        const response = await axios.post<Conversation>(
          `${API_URL}/conversations`,
          { userEmail: localEmail }
        );
        const newConversation = response.data;
  
        setConversations((prev:Conversation[]) => [...prev, newConversation]);
        router.push(`/conversation/${newConversation.id}`);
  
        resolve();
      } catch (error) {
        console.error("Error starting conversation:", error);
        reject(error);
      }
    });
  
    toast.promise(conversationPromise, {
      loading: "Starting conversation...",
      success: "Conversation started successfully",
      error: "Failed to start conversation",
    });
  };
  
  return (
    <div className="flex flex-col justify-center p-4">
      {!localEmail ? (
       <form
       onSubmit={(e) => {
         e.preventDefault();
         handleSend();
       }}
       className="flex flex-col gap-4 items-center justify-center h-[80vh] w-full"
     >
       <h3 className="font-bold text-xl">Hi, Welcome</h3>
       <div className="flex gap-2 items-center w-full justify-center">
         <TextField
           placeholder="Enter your email to start a conversation"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           className=" sm:w-full md:w-full lg:w-1/3"
         />
         <Button variant="contained" color="primary" type="submit">
           Send
         </Button>
       </div>
     </form>
     
      ) : (
        <>
          <Button variant="contained" color="secondary" onClick={handleStartConversation}>
          < LuBadgePlus />
          Start New Conversation
          </Button>
          <ConversationList
            conversations={conversations}
            onDelete={handleDeleteConversation}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;

