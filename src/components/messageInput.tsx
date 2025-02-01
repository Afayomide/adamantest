"use client";
import { FC, useState } from 'react';
import { TextField, Button } from '@mui/material';

interface MessageInputProps {
  onSend: (message: string) => void;
}

const MessageInput: FC<MessageInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <div className="flex space-x-2 mt-4">
      <TextField
        fullWidth
        label="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        variant="outlined"
      />
      <Button variant="contained" color="primary" onClick={handleSend}>
        Send
      </Button>
    </div>
  );
};

export default MessageInput;
