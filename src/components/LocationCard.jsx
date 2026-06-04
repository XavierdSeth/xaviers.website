import { Clock, MapPin } from "lucide-react";
import { site } from "../config/site.js";
import { useLocalTime } from "../hooks/useLocalTime.js";
import { SiteCard } from "./SiteCard.jsx";

export function LocationCard() {
  const time = useLocalTime(site.location.timezone);

  return (
    <SiteCard className="location-card">
      <div className="location-card__place">
        <MapPin size={16} className="location-card__icon" aria-hidden="true" />
        <span>{site.location.label}</span>
      </div>
      <div className="location-card__time" aria-live="polite">
        <Clock size={14} className="location-card__icon" aria-hidden="true" />
        <time dateTime={time}>{time}</time>
      </div>
    </SiteCard>
  );
}
