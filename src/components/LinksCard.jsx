import { Github, Mail } from "lucide-react";
import { site } from "../config/site.js";
import { SiteCard } from "./SiteCard.jsx";
import { SectionLabel } from "./SectionLabel.jsx";

const iconMap = {
  github: Github,
  mail: Mail,
};

export function LinksCard() {
  return (
    <SiteCard className="links-card">
      <SectionLabel>Links</SectionLabel>
      <ul className="links-list">
        {site.links.map((link) => {
          const Icon = iconMap[link.icon] ?? Mail;
          return (
            <li key={link.href}>
              <a
                href={link.href}
                className="links-list__item"
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <Icon size={16} className="links-list__icon" aria-hidden="true" />
                <span>{link.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </SiteCard>
  );
}
