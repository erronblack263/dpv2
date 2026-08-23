import { ProjectComingSoonPage } from "@/components/project-coming-soon";

export default function PortfolioCMSComingSoon() {
  return (
    <ProjectComingSoonPage
      title="SageOS"
      description="A custom operating system made from scratch, exploring low-level systems programming, memory management, process scheduling, and kernel development."
      tech={["C", "Assembly", "Systems Programming", "Kernel Development"]}
      icon="code"
    />
  );
}
