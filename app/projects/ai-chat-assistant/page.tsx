import { ProjectComingSoonPage } from "@/components/project-coming-soon";

export default function AIChatAssistantComingSoon() {
  return (
    <ProjectComingSoonPage
      title="AI Chat Assistant"
      description="A conversational AI interface powered by OpenAI, with persistent chat history, markdown rendering, streaming responses, and responsive multi-session UX."
      tech={["Next.js", "OpenAI", "TypeScript", "Tailwind CSS", "Streaming"]}
      icon="message"
      variant="ai"
    />
  );
}
