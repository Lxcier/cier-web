# CIER · site e portfólio

Next.js (App Router) + TypeScript. Site institucional da CIER, portfólio filtrável e projetos demonstrativos.

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção (também confere os tipos)
npm run start
```

## Estrutura

```
public/images/            logo e imagens estáticas
src/
├─ app/                   ROTAS (cada pasta é um endereço)
│  ├─ layout.tsx          html/body e metadados globais
│  ├─ not-found.tsx       404 global
│  ├─ (site)/             grupo com cabeçalho, rodapé e CSS do site (não aparece na URL)
│  │  ├─ layout.tsx
│  │  ├─ page.tsx                  /
│  │  ├─ not-found.tsx
│  │  └─ portfolio/
│  │     ├─ page.tsx               /portfolio  (?frente=sites|identidade|interfaces)
│  │     └─ [slug]/page.tsx        /portfolio/<slug>
│  └─ demos/              projetos demonstrativos, fora do layout do site
│     ├─ sorriso-prime/page.tsx    /demos/sorriso-prime
│     ├─ vila-nova-imoveis/page.tsx /demos/vila-nova-imoveis
│     └─ loja-virtual/page.tsx     /demos/loja-virtual
├─ components/            COMPONENTES (um arquivo por componente, nome único)
│  ├─ layout/             Header, Footer, WhatsAppFloat
│  ├─ home/               Hero, Services, PortfolioTeaser, Pricing, Process, Contact, ContactForm
│  ├─ portfolio/          PortfolioView, PortfolioExplorer, ProjectCard, ProjectDetail
│  ├─ ui/                 Icons, Breadcrumbs
│  └─ demos/              um diretório por demo, com CSS Module e fontes próprias
│     ├─ clinic/          ClinicDemo.tsx, ClinicBooking.tsx, ClinicTriage.tsx, clinic.module.css, fonts.ts
│     ├─ real-estate/     RealEstateDemo.tsx, real-estate.module.css, listings.ts, fonts.ts
│     ├─ store/           StoreDemo.tsx, icons.tsx, products.ts, store.module.css, fonts.ts
│     └─ demo-base.css    base compartilhada dos demos (escopada por [data-demo])
├─ data/                  DADOS: projects.ts (catálogo do portfólio), site.ts (contato)
├─ lib/                   FUNÇÕES: whatsapp.ts, projects.ts
├─ styles/                CSS do site: reset, base, header, hero, sections, pages
└─ types/                 TIPOS: project.ts
```

Regra de bolso: página só monta componentes (`app/`), componente só desenha (`components/`),
conteúdo mora em `data/`, regra reutilizável em `lib/`.

## Como adicionar um projeto ao portfólio

1. Crie o componente em `src/components/demos/<nome>/` (CSS Module + fontes próprias).
2. Crie a rota em `src/app/demos/<slug>/page.tsx`.
3. Em `src/data/projects.ts`, ache a entrada do projeto (ou crie uma) e use
   `status: "demo"` e `demoHref: "/demos/<slug>"`.

Ele aparece sozinho em `/portfolio`, nos filtros e em `/portfolio/<slug>`.

## Observações

- Os projetos com `status: "dev"` aparecem como "Em desenvolvimento". Para esconder até estarem prontos,
  filtre por `status === "demo"` em `projetosDaFrente` (`src/lib/projects.ts`).
- Contato (WhatsApp e e-mail) fica em `src/data/site.ts`.
- Fontes vêm de `next/font/google` (baixadas no build, sem requisição do visitante ao Google).
