import { GraduationCap } from "lucide-react";
import { site } from "../config/site.js";
import { SiteCard } from "./SiteCard.jsx";
import { SectionLabel } from "./SectionLabel.jsx";

export function EducationCard() {
  const { title, subtitle } = site.education;

  return (
    <SiteCard className="education-card">
      <SectionLabel icon={GraduationCap}>Education</SectionLabel>
      <h2 className="education-card__title">{title}</h2>
      <p className="education-card__subtitle">{subtitle}</p>
    </SiteCard>
  );
}
