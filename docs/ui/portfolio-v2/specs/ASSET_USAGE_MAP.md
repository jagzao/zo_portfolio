# Asset Usage Map

| Asset | Purpose | Screen | Implementation target |
|---|---|---|---|
| approved/00_APPROVED_MASTER_BOARD.svg | visual source of truth | all | docs only |
| assets/bg-premium-grid.svg | subtle premium background | Home / section backgrounds | public assets |
| assets/architecture-lab-hero-graph.svg | hero/teaser reference | Home | component reference / fallback |
| assets/technical-arsenal-graph.svg | graph visual reference | Technical Arsenal | component reference / fallback |
| design/tokens.json | color/spacing/effect tokens | global | Tailwind/CSS variables |

## Rule
Interactive graphs must be implemented as native SVG/React components from data. Do not ship the reference graph SVG as the only interactive experience.
