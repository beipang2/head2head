/**
 * Edit this file to re-skin the site for any photo competition.
 * No other files need to change for a new topic.
 */
const siteConfig = {
  /** Displayed in the nav bar and browser tab */
  name: "HEAD2HEAD",

  /** Short tagline shown on the voting page */
  tagline: "Which one is better?",

  /** Description for SEO / Open Graph */
  description: "Vote for your favorite photos in head-to-head matchups.",

  /** Accent color — any valid Tailwind color class suffix, e.g. "rose", "blue", "emerald" */
  accentColor: "rose" as
    | "rose"
    | "blue"
    | "emerald"
    | "violet"
    | "amber"
    | "cyan"
    | "orange",

  /** Text shown below each photo pair to prompt a vote */
  votePrompt: "Click the one you prefer",

  /** Label for the leaderboard page */
  leaderboardTitle: "Rankings",
} as const;

export default siteConfig;
