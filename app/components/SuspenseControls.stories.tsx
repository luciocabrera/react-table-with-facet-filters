import type { Meta, StoryObj } from "@storybook/react";
import { SuspenseControls } from "./SuspenseControls";

const meta: Meta<typeof SuspenseControls> = {
  title: "Components/SuspenseControls",
  component: SuspenseControls,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Demo controls for Suspense functionality. Shows when data is loading via server promises and provides controls to refresh data. Only renders when a department is selected.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    department: {
      description:
        "The currently selected department. Component only renders if this is provided.",
      control: { type: "select" },
      options: [
        "Engineering",
        "Marketing",
        "Sales",
        "HR",
        "Finance",
        "Operations",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Hidden: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "When no department is selected, the component renders nothing (null).",
      },
    },
  },
};

export const WithEngineering: Story = {
  args: {
    department: "Engineering",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Suspense controls shown for Engineering department with refresh functionality.",
      },
    },
  },
};

export const WithMarketing: Story = {
  args: {
    department: "Marketing",
  },
  parameters: {
    docs: {
      description: {
        story: "Suspense controls shown for Marketing department.",
      },
    },
  },
};

export const WithSales: Story = {
  args: {
    department: "Sales",
  },
  parameters: {
    docs: {
      description: {
        story: "Suspense controls shown for Sales department.",
      },
    },
  },
};

export const WithHR: Story = {
  args: {
    department: "HR",
  },
  parameters: {
    docs: {
      description: {
        story: "Suspense controls shown for HR department.",
      },
    },
  },
};

export const WithFinance: Story = {
  args: {
    department: "Finance",
  },
  parameters: {
    docs: {
      description: {
        story: "Suspense controls shown for Finance department.",
      },
    },
  },
};

export const WithOperations: Story = {
  args: {
    department: "Operations",
  },
  parameters: {
    docs: {
      description: {
        story: "Suspense controls shown for Operations department.",
      },
    },
  },
};

// Interactive demo
export const Interactive: Story = {
  args: {
    department: "Engineering",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive demo - click the refresh button to see the reload action (will reload the entire page in this demo).",
      },
    },
  },
  play: async ({ canvasElement }) => {
    // Could add automated interactions here
    const button = canvasElement.querySelector("button");
    if (button) {
      console.log("Refresh button found and ready for interaction");
    }
  },
};
