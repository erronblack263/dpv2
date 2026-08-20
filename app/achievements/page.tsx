import type { Metadata } from "next";
import { AchievementsContent } from "./achievements-content";

export const metadata: Metadata = {
  title: "Achievements — Witness H Musonza",
  description:
    "Personal achievements and accolades of Witness Musonza, including the Project of the Year award.",
};

export default function AchievementsPage() {
  return <AchievementsContent />;
}
