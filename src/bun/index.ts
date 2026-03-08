import { BrowserView, BrowserWindow, Updater, Utils } from "electrobun/bun";
import type { GotchuRPC } from "../shared/rpc-types";

const DEV_SERVER_PORT = 5173;
const DEV_SERVER_URL = `http://localhost:${DEV_SERVER_PORT}`;

// Check if Vite dev server is running for HMR
async function getMainViewUrl(): Promise<string> {
  const channel = await Updater.localInfo.channel();
  if (channel === "dev") {
    try {
      await fetch(DEV_SERVER_URL, { method: "HEAD" });
      console.log(`HMR enabled: Using Vite dev server at ${DEV_SERVER_URL}`);
      return DEV_SERVER_URL;
    } catch {
      console.log(
        "Vite dev server not running. Run 'bun run dev:hmr' for HMR support.",
      );
    }
  }
  return "views://mainview/index.html";
}

const POSTURE_MESSAGES = [
  "Sit up straight — your spine will thank you.",
  "Shoulders back, chin up. You've got this.",
  "Quick posture check — how's your back doing?",
  "Roll those shoulders back and breathe.",
  "You're slouching again. Fix it before it fixes you.",
  "Stand tall, even if you're sitting.",
  "Spine check! Adjust before it aches.",
  "Your future self is asking you to sit up right now.",
  "Uncrumple yourself for a second.",
  "That hunch isn't doing your neck any favors.",
  "Chest out, shoulders down. There you go.",
  "You've been at it a while — straighten up.",
  "Back against the chair. Deep breath. Good.",
  "Your posture just sent an SOS.",
  "Gravity wins if you let it. Sit up.",
  "Time to unfold yourself.",
  "Neck check — is your head floating forward?",
  "Stand up, stretch it out, sit back down right.",
  "Your chiropractor doesn't need more business. Sit up.",
  "Core engaged, back straight. Just for a minute.",
  "Reset your posture before your body resets it for you.",
  "Slouching detected. Please stand by.",
  "How's the lower back feeling? Adjust now.",
];

let messageIndex = 0;

// Set up RPC so the webview can request bun-only operations
const rpc = BrowserView.defineRPC<GotchuRPC>({
  handlers: {
    messages: {
      showPostureNotification: () => {
        Utils.showNotification({
          title: "Unslouch!",
          body: POSTURE_MESSAGES[messageIndex % POSTURE_MESSAGES.length],
        });
        messageIndex++;
      },
    },
  },
});

// Create the main application window
const url = await getMainViewUrl();

const mainWindow = new BrowserWindow({
  title: "gotchu",
  url,
  rpc,
  frame: {
    width: 900,
    height: 700,
    x: 200,
    y: 200,
  },
});

// Quit the app when the main window is closed
mainWindow.on("close", () => {
  Utils.quit();
});
