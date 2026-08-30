import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Chat Assistant",
  description:
    "AI Chat Assistant is a conversational interface built for streaming responses, persistent chat, and modern AI-driven user interaction.",
  alternates: {
    canonical: "/projects/ai-chat-assistant",
  },
  openGraph: {
    title: "AI Chat Assistant | AI Product",
    description:
      "A conversational AI product with streaming responses, persistent chat history, and modern interaction design.",
    url: "https://portfolio.sagetech.co.zw/projects/ai-chat-assistant",
    siteName: "Witness H Musonza Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Chat Assistant | AI Product",
    description:
      "A conversational AI product with streaming responses, persistent chat history, and modern interaction design.",
  },
};

export default function AIChatAssistantLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
