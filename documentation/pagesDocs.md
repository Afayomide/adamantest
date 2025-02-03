# `HomePage` Page Component Documentation

## Description:
The `HomePage` component is a React functional component that allows users to start a conversation by registering with their email and displaying a list of existing conversations. It uses hooks for managing state and interacting with APIs for user registration and conversation handling.

## Functionality:

### 1. **User Registration (Email Entry)**:
- Initially, the user is prompted to enter their email address to start a conversation.
- The email is validated and stored in `localStorage` for persistence across sessions.
- The user's email is sent to the backend for registration.
- If the registration is successful, the user's state is updated and they are allowed to start a conversation.

### 2. **Start a New Conversation**:
- Once the user has registered with an email, they can click the "Start New Conversation" button.
- The conversation is created by sending the email to the backend to create a new conversation.
- The user is then redirected to the new conversation page.

### 3. **Delete a Conversation**:
- Each conversation listed has an option to delete.
- Deleting a conversation removes it from both the backend and the frontend state.

## Endpoint Interactions:

1. **User Registration**:
   - **POST Request**: `/users/register`
     - **Request Body**:
       ```json
       {
         "email": "user@example.com"
       }
       ```
     - **Response**: Returns the created or existing user object.

2. **Start a Conversation**:
   - **POST Request**: `/conversations`
     - **Request Body**:
       ```json
       {
         "userEmail": "user@example.com"
       }
       ```
     - **Response**: Returns the new conversation object.

3. **Delete a Conversation**:
   - **DELETE Request**: `/conversations/{id}`
     - **Response**: Deletes the conversation and returns a success status.

## Component Features:

### **State Management**:
- `email`: Stores the email input by the user.
- `localEmail`: Stores the email from `localStorage`, ensuring the email persists across sessions.
- `conversations`: Stores the list of all conversations the user has.

### **UI Components**:
- **TextField**: An input field for the user to enter their email.
- **Button**: A button to trigger email submission and start a conversation.
- **ConversationList**: A component that displays a list of all conversations with options to delete them.

### **Toast Notifications**:
- Provides feedback to the user during actions like registration, conversation creation, and deletion.
  - `loading`: Displays while the action is being processed.
  - `success`: Displays on successful completion.
  - `error`: Displays if an error occurs.

### **Conditional Rendering**:
- Displays the email input form if the user is not logged in.
- Displays the button to start a new conversation and the list of existing conversations if the user is logged in.

## Example Usage:

#### Registering the User:
When the page first loads, the user will see a form to enter their email. After submitting the email, a user will be registered or logged in, and they can proceed to start a new conversation.

#### Starting a Conversation:
Once the email is registered, the user can click the "Start New Conversation" button, which will create a new conversation, and the user will be redirected to that conversation's page.

#### Deleting a Conversation:
The user can delete a conversation by clicking the delete button next to each conversation in the conversation list.




# `ConversationID` Page Documentation

## Description:
The `ConversationPage` component represents a page dedicated to a specific conversation. It allows users to view the conversation history, send new messages, and delete the conversation. The component interacts with the backend to fetch and send messages, updating the UI dynamically. It also uses the `ConversationContext` to manage and update the list of conversations.

## Features:
- **Message Fetching**: Retrieves the conversation messages from the backend and displays them in real-time.
- **Message Sending**: Allows the user to send messages, with an automatic AI-generated response following each user message.
- **Conversation Deletion**: Provides an option to delete the current conversation, which removes it from the conversation list and navigates the user back to the homepage.
- **Loading State**: Displays a loading state while the conversation messages are being fetched.
- **Message Display**: Shows a list of messages using the `MessageList` component.
- **Input for New Messages**: Includes a text input field via the `MessageInput` component for sending new messages.
- **Notification System**: Uses `react-hot-toast` to display loading, success, or error messages for asynchronous actions like deleting the conversation.

## Props:
The component does not receive any direct props. It retrieves the `id` parameter from the URL via `useParams` and manages local state for messages, loading, and sending status.

### `id` (URL Param):
- Represents the conversation ID, which is fetched from the URL using `useParams` from Next.js.
  
## State:
- **messages** (`Message[]`): Stores the list of messages in the current conversation.
- **loading** (`boolean`): Indicates whether the conversation data is being fetched.
- **sending** (`boolean`): Tracks the status of message sending to prevent multiple submissions.

## API Calls:
- **GET** `/messages/${id}`: Fetches all messages for the conversation identified by the `id`.
- **POST** `/messages/${id}`: Sends a new message (either from the user or AI) to the backend.
- **DELETE** `/conversations/${id}`: Deletes the conversation identified by the `id`.

## Usage:

### Example:
```tsx
import ConversationPage from './pages/conversation/[id]';

const App = () => {
  return (
    <ConversationPage />
  );
};




