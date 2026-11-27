import { Newsreader, Figtree } from "next/font/google";

export const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-clinic-serif",
  display: "swap",
});

export const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-clinic-sans",
  display: "swap",
});
