import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Storybook-specific Vite config that excludes React Router
export default defineConfig({
  plugins: [tailwindcss(), tsconfigPaths()],
  resolve: {
    alias: {
      "react-router": require.resolve("react-router"),
    },
  },
});
