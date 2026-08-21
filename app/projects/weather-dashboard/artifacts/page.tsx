import { ProjectComingSoonPage } from "@/components/project-coming-soon";

export default function WeatherDashboardArtifacts() {
  return (
    <ProjectComingSoonPage
      title="Weather Dashboard"
      description="Real-time weather dashboard with location search, 7-day forecasts, and interactive map overlays built for quick decision-making and rich weather exploration."
      tech={["React", "Python", "REST API", "Leaflet", "Forecasting"]}
      icon="code"
    />
  );
}
