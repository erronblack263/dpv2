import { ProjectComingSoonPage } from "@/components/project-coming-soon";

export default function WeatherDashboardArtifacts() {
  return (
    <ProjectComingSoonPage
      title="Sage Inventory Management System"
      description="A C# inventory management system backed by MySQL Server, with full CRUD functions for creating, viewing, updating, and deleting product records."
      tech={["C#", "MySQL Server", "CRUD", "Desktop Application"]}
      icon="code"
    />
  );
}
