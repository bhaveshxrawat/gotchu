# gotchu

A lightweight macOS desktop app that nudges you to fix your posture at random intervals using system notifications.

## Stack

- **[Electrobun](https://blackboard.sh/electrobun)** — desktop app runtime (not Electron)
- **React + Vite** — UI with hot module replacement
- **Tailwind CSS v4** — styling
- **Bun** — runtime and package manager

## Getting Started

```bash
# Install dependencies
bun install

# Development with HMR (recommended)
bun run dev:hmr

# Development without HMR
bun run dev

# Production build
bun run build

# Production release stable build
bun run build:stable
```

## How it works

Click **Unslouch me** to start the timer. Every 5–15 minutes (random interval), you'll get a system notification reminding you to fix your posture. The messages cycle through a set of 23 different nudges. Click **Working...** to stop.

## Project Structure

```
src/
├── bun/
│   └── index.ts          # Main process — window setup, RPC handlers, notifications
├── shared/
│   └── rpc-types.ts      # Shared RPC type schema (browser ↔ bun)
├── mainview/
│   ├── App.tsx           # Main React component
│   ├── main.tsx          # React entry point
│   ├── index.html        # HTML template
│   └── index.css         # Tailwind CSS
└── components/
    └── question-mark.tsx # Help popover
```

## Architecture note

System notifications (`Utils.showNotification`) can only be called from the Bun process, not the browser context. The UI sends an RPC message (`showPostureNotification`) to the Bun side, which handles the actual notification. See `src/shared/rpc-types.ts` for the schema.
