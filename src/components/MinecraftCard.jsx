import { Box, Check, Copy } from "lucide-react";
import { site } from "../config/site.js";
import { useCopy } from "../hooks/useCopy.js";
import { SiteCard } from "./SiteCard.jsx";
import { SectionLabel } from "./SectionLabel.jsx";

export function MinecraftCard() {
  const { copied, copy } = useCopy();
  const { address } = site.minecraft;

  return (
    <SiteCard className="minecraft-card">
      <SectionLabel icon={Box}>Minecraft server</SectionLabel>
      <div className="minecraft-card__body">
        <code className="minecraft-card__address">{address}</code>
        <button
          type="button"
          className="copy-btn"
          onClick={() => copy(address)}
          aria-label={copied ? "Copied" : "Copy server address"}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
    </SiteCard>
  );
}
