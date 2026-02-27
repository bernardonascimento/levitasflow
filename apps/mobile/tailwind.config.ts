import type { Config } from "tailwindcss";
// @ts-expect-error nativewind preset currently has no module typing here
import nativewindPreset from "nativewind/preset";

const config: Config = {
  presets: [nativewindPreset],
  content: ["./App.tsx", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {}
  },
  plugins: []
};

export default config;
