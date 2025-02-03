# `Header` Component Documentation

## Description:
The `Header` component is a navigation header for the application. It provides links to conversations, a mobile-friendly menu, and an option to exit the app. The header adapts based on the screen size and user status (logged in or not).

## Features:
- **Navigation**: The header allows users to access their conversations and log out.
- **Mobile Menu**: The header includes a responsive mobile menu that shows a list of conversations.
- **Exit Button**: If the user is logged in, an "Exit" button allows them to log out of the application.

## Components:
### 1. **Main Navigation (Desktop)**
   - **Logo**: A clickable icon (`IoMdChatboxes`) redirects to the homepage.
   - **Conversations Menu**: Displays a dropdown with a list of ongoing conversations. The conversation list is loaded from the `useConversations` context and is displayed only if there are conversations. Otherwise, it shows a message indicating there are no conversations.
   - **Exit Button**: If the user is logged in, a clickable "Exit" button logs the user out and redirects them to the homepage.

### 2. **Mobile Navigation (Mobile)**
   - **Mobile Menu**: A hamburger button (`Bars3Icon`) toggles the mobile menu.
   - **Conversation Disclosure**: A collapsible section (`Disclosure`) lists the conversations. If the user has no conversations, it shows a message indicating this. Clicking on a conversation will redirect the user to the corresponding conversation page.
   - **Exit Button**: A similar "Exit" button is present in the mobile view, which logs the user out if they are logged in.

### 3. **Popovers & Modals**
   - **Popover**: A popover (`Popover`) is used for showing the conversation list on larger screens. The list of conversations is displayed in a dropdown panel when the "Conversations" button is clicked.
   - **Dialog**: For smaller screens, a `Dialog` component is used to display the mobile menu, which contains the conversation list and the "Exit" button.

## State:
- **`mobileMenuOpen`**: Boolean that tracks whether the mobile menu is open or closed.
- **`conversations`**: Array of conversations fetched from the `useConversations` context.
- **`loading`**: Boolean that indicates whether the conversations are still loading.
- **`user`**: User object from the `useConversations` context, representing the current logged-in user.

## Functions:
### 1. **`leaveApp`**:
   - Removes the `email` from `localStorage` and updates the user state to `false` in the context (logging the user out).
   - Redirects the user to the homepage using `useRouter()`.

## Behavior:
- **Desktop View**: 
   - Displays the logo, "Conversations" dropdown, and "Exit" button (if the user is logged in).
- **Mobile View**:
   - Displays a hamburger icon (`Bars3Icon`), which opens a dialog containing the conversation list and an "Exit" button.
   - Conversations are listed within a collapsible disclosure panel. The user can click on a conversation to navigate to the conversation page.

## Styles:
- **Popover**: Uses Tailwind classes such as `absolute`, `top-full`, `z-10`, and `mt-3` for positioning the conversation list.
- **Dialog**: Utilizes classes like `fixed`, `inset-y-0`, and `bg-white` for the layout of the mobile menu.
- **Mobile/Tablet Responsiveness**: 
   - The header transitions between a full desktop layout and a mobile-optimized view.
   - The mobile menu is hidden by default and can be toggled by clicking the hamburger icon.
   - Tailwind classes like `lg:hidden` and `lg:flex` manage the responsiveness of the components.


