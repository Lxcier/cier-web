import Image from "next/image";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="foot">
      <div className="row">
        <Image className="logo" src="/images/logo-cier.png" alt="CIER" width={658} height={285} />
        <p>
          © 2026 CIER · Sites, identidade visual e interfaces · {site.email}
        </p>
      </div>
    </footer>
  );
}
