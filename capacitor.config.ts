import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "zw.co.sagetech.portfolio",
  appName: "Witness Musonza",
  webDir: "public",
  server: {
    url: "https://portfolio.sagetech.co.zw",
    cleartext: true,
  },
};

export default config;
