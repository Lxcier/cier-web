import type { ReactNode } from "react";
import "@/components/demos/demo-base.css";

/* Os demos ficam fora do grupo (site): não têm o cabeçalho do site e cada um traz o próprio visual (CSS Modules). */
export default function DemosLayout({ children }: { children: ReactNode }) {
  return children;
}
