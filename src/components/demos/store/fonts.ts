import { Bricolage_Grotesque, DM_Sans } from "next/font/google";

export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});
export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dmsans",
  display: "swap",
});
