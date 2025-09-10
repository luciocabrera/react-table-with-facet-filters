import type { Meta, StoryObj } from "@storybook/react";
import { TableSkeleton, DepartmentFilterSkeleton } from "./TableSkeleton";

// Meta for TableSkeleton
const tableSkeletonMeta: Meta<typeof TableSkeleton> = {
  title: "Components/Skeletons/TableSkeleton",
  component: TableSkeleton,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Loading skeleton for the FacetFilterTable component. Shows animated placeholders for table headers, rows, and filter summary while data is loading.",
      },
    },
  },
  tags: ["autodocs"],
};

export default tableSkeletonMeta;
type TableSkeletonStory = StoryObj<typeof tableSkeletonMeta>;

export const Default: TableSkeletonStory = {
  parameters: {
    docs: {
      description: {
        story:
          "Default table skeleton with animated loading placeholders for 10 rows and 7 columns.",
      },
    },
  },
};

// Multiple instances to show variation
export const MultipleInstances: TableSkeletonStory = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">First Table Loading</h3>
        <TableSkeleton />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Second Table Loading</h3>
        <TableSkeleton />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Multiple table skeletons to demonstrate how they look when multiple tables are loading simultaneously.",
      },
    },
  },
};

// Dark mode demonstration
export const DarkMode: TableSkeletonStory = {
  render: () => (
    <div className="dark bg-gray-900 p-6 rounded-lg">
      <TableSkeleton />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Table skeleton in dark mode to show how it adapts to different themes.",
      },
    },
  },
};

// Meta for DepartmentFilterSkeleton
const departmentSkeletonMeta: Meta<typeof DepartmentFilterSkeleton> = {
  title: "Components/Skeletons/DepartmentFilterSkeleton",
  component: DepartmentFilterSkeleton,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Loading skeleton for the DepartmentFilter component. Shows animated placeholders for department filter buttons while data is loading.",
      },
    },
  },
  tags: ["autodocs"],
};

export const DepartmentDefault: StoryObj<typeof departmentSkeletonMeta> = {
  parameters: {
    docs: {
      description: {
        story: "Default department filter skeleton with 5 placeholder buttons.",
      },
    },
  },
};

export const DepartmentWithTableSkeleton: StoryObj<
  typeof departmentSkeletonMeta
> = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold">
          Department Filter Loading
        </h3>
        <DepartmentFilterSkeleton />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Table Loading</h3>
        <TableSkeleton />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Combined loading state showing both department filter and table skeletons together, as they would appear in the actual application.",
      },
    },
  },
};

export const DepartmentDarkMode: StoryObj<typeof departmentSkeletonMeta> = {
  render: () => (
    <div className="dark bg-gray-900 p-6 rounded-lg">
      <DepartmentFilterSkeleton />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Department filter skeleton in dark mode.",
      },
    },
  },
};

// Combined story showing both skeletons together
export const CombinedLoadingState: StoryObj<typeof departmentSkeletonMeta> = {
  render: () => (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Employee Dashboard</h2>
        <p className="text-gray-600 mb-6">
          Loading department data and employee information...
        </p>
      </div>

      <DepartmentFilterSkeleton />

      <div className="mt-6">
        <TableSkeleton />
      </div>

      <div className="mt-4 text-sm text-gray-500">
        This represents the full loading state of the employee management
        interface.
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Complete loading state showing how the skeletons work together in a real application context.",
      },
    },
  },
};

// Animation demonstration
export const AnimationDemo: StoryObj<typeof departmentSkeletonMeta> = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">
          Notice the Pulse Animation
        </h3>
        <p className="mb-4 text-sm text-gray-600">
          Both skeletons use the <code>animate-pulse</code> class for a subtle
          loading animation.
        </p>
        <DepartmentFilterSkeleton />
      </div>

      <div>
        <TableSkeleton />
      </div>

      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          Animation Details
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>
            • Skeletons use Tailwind's <code>animate-pulse</code> class
          </li>
          <li>• Animation provides visual feedback that content is loading</li>
          <li>• Maintains layout structure to prevent layout shift</li>
          <li>• Works in both light and dark modes</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstration of the pulse animation and loading behavior of the skeleton components.",
      },
    },
  },
};
