import type { ColecaoId } from "./products";

const base = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

/** Ícone de cada coleção/categoria da loja. */
export function StoreIcon({ id }: { id: ColecaoId }) {
  switch (id) {
    case "velas":
      return (
        <svg {...base}>
          <rect x="14" y="22" width="20" height="18" rx="3" />
          <path d="M24 22v-5" />
          <path d="M24 7c3 3 4 5 4 7a4 4 0 0 1-8 0c0-2 1-4 4-7Z" />
        </svg>
      );
    case "difusores":
      return (
        <svg {...base}>
          <path d="M18 22h12l2 6v12a2 2 0 0 1-2 2H18a2 2 0 0 1-2-2V28z" />
          <path d="M22 22 20 8M26 22V6M30 22l3-14" />
        </svg>
      );
    case "ceramica":
      return (
        <svg {...base}>
          <path d="M18 8h12" />
          <path d="M20 8c0 5-6 8-6 16 0 9 4 16 10 16s10-7 10-16c0-8-6-11-6-16" />
        </svg>
      );
    case "kits":
      return (
        <svg {...base}>
          <rect x="8" y="20" width="32" height="20" rx="2" />
          <path d="M6 14h36v6H6zM24 14v26" />
          <path d="M24 14c-4-6-10-6-10-2s6 2 10 2zM24 14c4-6 10-6 10-2s-6 2-10 2z" />
        </svg>
      );
    default:
      return (
        <svg {...base}>
          <path d="M24 6l4 12 12 4-12 4-4 12-4-12-12-4 12-4z" />
        </svg>
      );
  }
}
