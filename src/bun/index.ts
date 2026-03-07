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

// Set up RPC so the webview can request bun-only operations
const rpc = BrowserView.defineRPC<GotchuRPC>({
  handlers: {
    messages: {
      showPostureNotification: () => {
        Utils.showNotification({
          title: "Unslouch!",
          body: "Time to fix your posture.",
        });
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
