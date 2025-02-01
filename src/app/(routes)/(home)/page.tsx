"use client";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import ConversationList from "@/components/conversationList";
import { TextField, Button } from "@mui/material";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


export const API_URL = process.env.NEXT_PUBLIC_API_URL;

const HomePage: FC = () => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [email, setEmail] = useState<string>("");
  const [localEmail, setLocalEmail] = useState<string | null>(null);
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem("email");
      setLocalEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    if (localEmail) {
      console.log("Fetching conversations for:", localEmail);
      axios
        .get(`${API_URL}/conversations/${localEmail}`)
        .then((response: any) => {
          console.log(response);
          setConversations(response.data); 
        })
        .catch((error) => console.error(error));
    }
  }, [localEmail]);

  const handleDeleteConversation = (id: string) => {
    axios
      .delete(`${API_URL}/conversations/${id}`)
      .then(() => {
        setConversations((prev) => prev.filter((conv) => conv.id !== id));
        toast.success("Conversation deleted successfully");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to delete conversation");
      });
  };

  const handleSend = async () => {
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/users/register`, { email });

      toast.success("User created successfully");
      setEmail("");
      localStorage.setItem("email", email);
      setLocalEmail(email);
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Failed to create user");
    }
  };

  const handleStartConversation = async () => {
    if (!localEmail) {
      toast.error("Please Enter you email first.");
      return;
    }

    try {
      const response = await axios.post<{ id: string }>(`${API_URL}/conversations`, { userEmail: localEmail });
      const newConversation = response.data;

      setConversations((prev) => [...prev, newConversation]);
      toast.success("Conversation started successfully");

      router.push(`/conversation/${newConversation.id}`);
    } catch (error) {
      console.error("Error starting conversation:", error);
      toast.error("Failed to start conversation");
    }
  };
  return (
    <div className="flex flex-col justify-center p-4">
      {!localEmail ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2 mb-4"
        >
          <TextField
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit">
            Send
          </Button>
        </form>
      ) : (
        <>
          <Button variant="contained" color="secondary" onClick={handleStartConversation}>
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

