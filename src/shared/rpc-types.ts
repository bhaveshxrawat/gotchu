import type { RPCSchema } from "electrobun/bun";

export type GotchuRPC = {
  bun: RPCSchema<{
    messages: {
      showPostureNotification: {};
    };
  }>;
  webview: RPCSchema;
};
