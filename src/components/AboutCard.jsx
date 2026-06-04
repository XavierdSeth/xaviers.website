import { site } from "../config/site.js";
import { SiteCard } from "./SiteCard.jsx";
import { SectionLabel } from "./SectionLabel.jsx";

export function AboutCard() {
  return (
    <SiteCard className="about-card">
      <SectionLabel dot>About me</SectionLabel>
      <h1 className="about-card__name">{site.name}</h1>
      <p className="about-card__tagline">{site.tagline}</p>
      {site.interests?.length > 0 && (
        <div className="about-card__tags" aria-label="Interests">
          {site.interests.map((item) => (
            <span key={item} className="tag-pill">
              {item}
            </span>
          ))}
        </div>
      )}
    </SiteCard>
  );
}
