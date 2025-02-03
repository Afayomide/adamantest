# `MessageInput` Component Documentation

## Description:
The `MessageInput` component is a functional React component that allows the user to type and send messages. It takes a message input, handles form submission, and triggers an `onSend` callback when the send button or form is submitted. This component is part of a messaging interface, where it can be used for chatting, notifications, or any communication system.

## Component Props:
- **`onSend`**: A function that is called when the user sends a message. It accepts the message as an argument.
    - Type: `(message: string) => void`
    - Required: `true`
  
- **`disabled`**: A boolean that disables the input and send button when set to `true`.
    - Type: `boolean`
    - Required: `true`

## Functionality:
1. **State**:
   - `message`: Holds the current input value of the message.

2. **Form Submission**:
   - When the user presses `Enter` or clicks the send button, the form is submitted and the `onSend` function is triggered with the message.
   - After sending the message, the input field is cleared.

3. **Input Field**:
   - Uses a `TextField` from Material UI for the user to type the message. It also accepts `disabled` state as a prop, preventing interaction when disabled.

4. **Send Button**:
   - A `Button` from Material UI styled with a send icon (`IoMdSend`) from `react-icons`. It triggers the `onSend` function on form submission and is also disabled based on the `disabled` prop.

## Usage:
- This component is typically used in messaging or chat interfaces to collect and send user input.
- It can be placed at the bottom of a page or container to allow users to send messages continuously.

## Example:

### Parent Component Example:
```tsx
import React, { useState } from 'react';
import MessageInput from './MessageInput';

const ChatComponent = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const handleSendMessage = (message: string) => {
    setMessages([...messages, message]);
  };

  return (
    <div>
      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <MessageInput onSend={handleSendMessage} disabled={false} />
    </div>
  );
};



# `MessageList` Component Documentation

## Description:
The `MessageList` component is a functional React component that displays a list of messages. Each message is styled differently based on whether it is sent by the user or the system (bot). The messages are passed as a prop, and the component renders each one in a formatted `Paper` container.

## Props:
- **messages** (array of objects): 
  - `text` (string): The content of the message.
  - `isUser` (boolean): Determines if the message is sent by the user (`true`) or not (`false`).




# `ConversationList` Component Documentation

## Description:
The `ConversationList` component displays a list of user conversations. Each conversation is clickable and redirects the user to the conversation details page. Additionally, it provides a delete button next to each conversation to remove it.

## Props:

### `conversations` (array of `Conversation` objects):
- **`id`** (string): The unique identifier of the conversation.
- **`createdAt`** (string): The timestamp of when the conversation was created.
- **`messages`** (array of objects):
  - **`text`** (string): The content of the message.
  - **`isUser`** (boolean): Indicates if the message was sent by the user (`true`) or the bot/system (`false`).

### `onDelete` (function):
- A callback function that is triggered when the user clicks the delete button for a conversation.
- **Arguments**:
  - `id` (string): The ID of the conversation to be deleted.

## Usage:

```tsx
<ConversationList 
  conversations={[{ id: '1', createdAt: '2025-01-01', messages: [{ text: 'Hi', isUser: true }] }]} 
  onDelete={handleDelete}
/>

