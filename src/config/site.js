/**
 * REMINDER: swap placeholder GitHub + email before you go live.
 *
 * profile.mode — "placeholder" or "image"
 * profile.showProfileFrame — framed square vs full photo
 */
export const site = {
  name: "Xavier",
  tagline:
    "Hey, I'm Xavier — a developer from Perth who builds web stuff and runs a small Minecraft server for friends.",

  profile: {
    mode: "placeholder",
    showProfileFrame: true,
    imageSrc: "/avatar.jpg",
    placeholderLetter: "X",
  },

  links: [
    {
      label: "github.com/xavier",
      href: "https://github.com/xavier",
      icon: "github",
      external: true,
    },
    {
      label: "hello@xaviers.website",
      href: "mailto:hello@xaviers.website",
      icon: "mail",
      external: false,
    },
  ],

  minecraft: {
    address: "mc.xaviers.website",
  },

  location: {
    label: "Perth, WA",
    timezone: "Australia/Perth",
  },

  notes:
    "Mostly here so people can grab the server IP and my email without digging through Discord. I'll add more when there's actually more to show.",

  education: {
    title: "High School",
    subtitle: "Year 11 — Computer Science & Mathematics",
  },

  interests: ["Web dev", "Minecraft", "Rust", "Lo-fi"],
};
