import { useState } from "react";
import { site } from "../config/site.js";
import { SiteCard } from "./SiteCard.jsx";

export function ProfileCard() {
  const { mode, showProfileFrame, imageSrc, placeholderLetter } = site.profile;
  const [imageFailed, setImageFailed] = useState(false);

  const isImage = mode === "image" && !imageFailed;
  const framed = isImage && showProfileFrame;
  const showPlaceholder = !isImage;

  return (
    <SiteCard className="profile-card" aria-label="Profile">
      <div
        className={[
          "profile-card__inner",
          isImage && !showProfileFrame && "profile-card__inner--full-image",
          framed && "profile-card__inner--framed",
          showPlaceholder && "profile-card__inner--placeholder",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {mode === "image" && !imageFailed ? (
          <img
            src={imageSrc}
            alt={`${site.name} profile`}
            className="profile-card__img"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span className="profile-card__letter" aria-hidden="true">
            {placeholderLetter}
          </span>
        )}
      </div>
    </SiteCard>
  );
}
