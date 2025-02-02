"use client";
import { FC, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { IoMdSend } from "react-icons/io";


interface MessageInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

const MessageInput: FC<MessageInputProps> = ({ onSend, disabled  }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
<form 
  className="flex space-x-2 mt-4 fixed bottom-0 left-0 w-full p-4 shadow-md z-10 bg-white" 
  onSubmit={(e) => {
    e.preventDefault();
    handleSend();
  }}
>
  <TextField
    fullWidth
    label="Type a message"
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    variant="outlined"
    disabled={disabled}
  />
  <Button 
    variant="contained" 
    color="primary" 
    type='submit' 
    disabled={disabled}
  >
    <IoMdSend/>
  </Button>
</form>

  );
};

export default MessageInput;
