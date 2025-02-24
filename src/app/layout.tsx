import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Header from "../components/header"
import { ConversationProvider } from "@/context/conversationContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChatApp",
  description: "Test for Adamant Code",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-screen">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-sm min-h-screen relative flex flex-col`}
      >
        {/* Background Gradient with Blur */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#3b82f6,_#facc15,_#ec4899)] opacity-30 blur-3xl"></div>
  
        {/* Content Wrapper */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <ConversationProvider>
          <Header/>
          <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              className: "",
              duration: 5000,
              style: {
                background: "#ffd79f",
                color: "#000",
              },
            }}
          />
          {children}
          </ConversationProvider>
        </div>
      </body>
    </html>
  );
  
  
}
