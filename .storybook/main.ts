import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../app/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");
    const tailwindcss = (await import("@tailwindcss/vite")).default;
    const tsconfigPaths = (await import("vite-tsconfig-paths")).default;

    // Completely replace the plugins array to exclude React Router
    return mergeConfig(config, {
      plugins: [tailwindcss(), tsconfigPaths()],
      resolve: {
        alias: {
          "react-router": require.resolve("react-router"),
        },
      },
      // Ensure we don't inherit any problematic configs
      configFile: false,
    });
  },
};
export default config;
