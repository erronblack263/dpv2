import { ProjectComingSoonPage } from "@/components/project-coming-soon";

export default function PortfolioCMSComingSoon() {
  return (
    <ProjectComingSoonPage
      title="Portfolio CMS"
      description="A headless CMS for managing portfolio content with a drag-and-drop page builder and live preview. Built with Next.js, Spring Boot, PostgreSQL and TypeScript."
      tech={["Next.js", "Spring Boot", "PostgreSQL", "TypeScript"]}
      icon="code"
    />
  );
}
