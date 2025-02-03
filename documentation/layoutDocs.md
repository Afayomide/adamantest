# RootLayout Component Documentation

## Description:
The `RootLayout` component is the top-level layout of the application. It is responsible for setting up the global page structure, including the background, font styles, header, and handling children content. Additionally, it wraps the content in a `ConversationProvider` context and includes the `Toaster` component for displaying notifications.

## Features:
- **Global Layout Setup**: It defines the basic structure and styling for the entire application, including font settings and background gradient.
- **Font Integration**: Uses `Geist` and `Geist_Mono` fonts from Google Fonts with variables to manage custom styles throughout the app.
- **Background Styling**: A radial gradient background with a blur effect applied behind the content.
- **Notification System**: Integrates `react-hot-toast` to display notifications at the top-right corner of the screen.
- **Context Provider**: Wraps the content in a `ConversationProvider`, allowing access to the conversation context in the app.

## Props:

### `children` (ReactNode):
- Represents the content that will be displayed in the layout. This is passed down from the page components to be rendered inside the layout.

## Usage:

```tsx
<RootLayout>
  {/* Page content goes here */}
</RootLayout>
