import { MessageSquare } from "lucide-react";
import { site } from "../config/site.js";
import { SiteCard } from "./SiteCard.jsx";
import { SectionLabel } from "./SectionLabel.jsx";

export function NotesCard() {
  return (
    <SiteCard className="notes-card">
      <SectionLabel icon={MessageSquare}>Notes</SectionLabel>
      <p className="notes-card__text">{site.notes}</p>
    </SiteCard>
  );
}
