# Merman

Mermaid-enhanced repository markdown editing web app. Synchronizes state between the web client, SqlRite database, local filesystem, and GitHub repository.

## Features

- **PWA with Robust Sync:** Smart synchronization between client, database, filesystem, and Git. Robust LocalStorage with exponential backoff for offline support.
- **Git Integration:** Pull versions from the repository to replace unstaged local files (non-destructive).
- **GitHub Auth:** Secure authentication using Better Auth (authentication only).
- **Markdown-Only:** Specialized editor for `.md` files containing Mermaid code blocks.
- **Keyboard-Centric:** Toggle between edit and view modes with a keyboard shortcut. No side-by-side view.
- **Performance:** High-performance queries with SqlRite (SQL prepared statements).
- **Opinionated Styling:** Built with `on_the_money.js` and Pico Classless CSS.

## Getting Started

### Prerequisites

- Node.js (Latest LTS)
- GitHub OAuth application credentials

### Installation

```bash
git clone https://github.com/possumtech/merman.git
cd merman
npm install
```

### Configuration

Copy `.env.example` to `.env` and fill in your GitHub OAuth credentials.

```bash
cp .env.example .env
```

### Running the Project

```bash
# Start development server (Vite + Express)
npm run dev
```

## Development

### Tech Stack

- **Server:** Express + WebSockets
- **Database:** SqlRite (Anti-ORM)
- **Frontend:** PWA, Vite, on_the_money.js, Pico CSS
- **Auth:** Better Auth + GitHub
- **Linting:** BiomeJs + `lint:otm`
- **Testing:** Node native test runner + Playwright (E2E)

### Commands

- `npm run lint:biome`: Run Biome linter.
- `npm run lint:otm`: Run on_the_money.js compliance check.
- `npm run test`: Run unit tests.
- `npm run test:coverage`: Run tests and ensure 80/80/100 coverage.
- `npm run check`: Run all linting, tests, and coverage checks.

## Testing Standards

Merman follows strict test-driven development:
- **Line Coverage:** 80%
- **Branch Coverage:** 80%
- **Function Coverage:** 100%
