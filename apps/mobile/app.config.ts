import "dotenv/config";

export default {
  name: "LevitasFlow",
  slug: "levitasflow",
  scheme: "levitasflow",
  version: "1.0.0",
  orientation: "portrait",
  ios: {
    bundleIdentifier: "br.com.levitasflow.app"
  },
  android: {
    package: "br.com.levitasflow.app"
  },
  extra: {
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
  }
};
