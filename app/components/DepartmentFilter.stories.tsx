import type { Meta, StoryObj } from "@storybook/react";
import { DepartmentFilter } from "./DepartmentFilter";

// Create a wrapper component that mocks the React Router dependencies
const DepartmentFilterWrapper = (props: any) => {
  // Mock the React Router hooks
//   const originalComponent = DepartmentFilter;

  // Override the component to mock the navigation calls
  const MockedDepartmentFilter = ({
    currentDepartment,
    onDepartmentChange,
    departmentStats,
  }: any) => {
    const handleDepartmentClick = (department: string) => {
      console.log(`Navigate to: /table?department=${department}`);
      onDepartmentChange?.(department);
    };

    const handlePrefetch = (department: string) => {
      console.log(`Prefetching data for ${department}`);
    };

    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Filter by Department
          </h2>
          {currentDepartment && departmentStats && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {departmentStats[currentDepartment]?.active || 0} active /{" "}
              {departmentStats[currentDepartment]?.total || 0} total employees
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          {[
            "Engineering",
            "Marketing",
            "Sales",
            "HR",
            "Finance",
            "Operations",
          ].map((department) => {
            const isActive = currentDepartment === department;
            const stats = departmentStats?.[department];

            return (
              <button
                key={department}
                onClick={() => handleDepartmentClick(department)}
                onMouseEnter={() => handlePrefetch(department)}
                onFocus={() => handlePrefetch(department)}
                className={`
                  group relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  ${
                    isActive ?
                      "bg-blue-600 text-white shadow-md transform scale-105"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
                  }
                `}
              >
                <span className="relative z-10">{department}</span>

                {/* Stats tooltip */}
                {stats && !isActive && (
                  <div className="absolute invisible group-hover:visible group-focus:visible opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-md shadow-lg whitespace-nowrap z-20">
                    <div className="text-center">
                      <div className="font-semibold">
                        {stats.total} employees
                      </div>
                      <div className="text-gray-300">{stats.active} active</div>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></div>
                  </div>
                )}

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute inset-0 bg-blue-600 rounded-md opacity-10 animate-pulse"></div>
                )}

                {/* Hover effect */}
                {!isActive && (
                  <div className="absolute inset-0 bg-blue-600 rounded-md opacity-0 group-hover:opacity-5 transition-opacity duration-200"></div>
                )}
              </button>
            );
          })}
        </div>

        {!currentDepartment && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Select a department to view employees
                </h3>
                <div className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                  Choose one of the department buttons above to load employee
                  data for that department.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return <MockedDepartmentFilter {...props} />;
};

const meta: Meta<typeof DepartmentFilterWrapper> = {
  title: "Components/DepartmentFilter",
  component: DepartmentFilterWrapper,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A department filter component that displays department buttons with statistics. Includes hover effects, tooltips, and navigation functionality. Note: Navigation is mocked in Storybook and will show console logs.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    currentDepartment: {
      description: "The currently selected department",
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
    onDepartmentChange: {
      description: "Callback function called when a department is selected",
      action: "department-changed",
    },
    departmentStats: {
      description:
        "Statistics for each department showing total and active employee counts",
      control: { type: "object" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample department statistics
const sampleStats = {
  Engineering: { total: 145, active: 132 },
  Marketing: { total: 87, active: 82 },
  Sales: { total: 156, active: 148 },
  HR: { total: 34, active: 31 },
  Finance: { total: 67, active: 59 },
  Operations: { total: 123, active: 115 },
};

export const Default: Story = {
  args: {
    departmentStats: sampleStats,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default department filter with no department selected. Shows the information message prompting user to select a department.",
      },
    },
  },
};

export const WithSelectedDepartment: Story = {
  args: {
    currentDepartment: "Engineering",
    departmentStats: sampleStats,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Department filter with Engineering selected. The selected department is highlighted and shows active/total employee count.",
      },
    },
  },
};

export const WithoutStats: Story = {
  args: {
    currentDepartment: "Marketing",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Department filter without statistics. Buttons still work but no tooltips or counts are shown.",
      },
    },
  },
};

export const AllDepartmentsWithStats: Story = {
  args: {
    departmentStats: sampleStats,
  },
  parameters: {
    docs: {
      description: {
        story:
          "All departments shown with statistics. Hover over each button to see the tooltip with employee counts.",
      },
    },
  },
};

export const SmallTeamStats: Story = {
  args: {
    currentDepartment: "HR",
    departmentStats: {
      Engineering: { total: 12, active: 11 },
      Marketing: { total: 8, active: 7 },
      Sales: { total: 15, active: 14 },
      HR: { total: 4, active: 4 },
      Finance: { total: 6, active: 5 },
      Operations: { total: 9, active: 8 },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Department filter for a smaller organization with fewer employees per department.",
      },
    },
  },
};

export const LargeOrganizationStats: Story = {
  args: {
    currentDepartment: "Sales",
    departmentStats: {
      Engineering: { total: 1245, active: 1198 },
      Marketing: { total: 387, active: 352 },
      Sales: { total: 2156, active: 2089 },
      HR: { total: 234, active: 221 },
      Finance: { total: 567, active: 534 },
      Operations: { total: 823, active: 789 },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Department filter for a large organization with many employees per department.",
      },
    },
  },
};

export const MixedActivityLevels: Story = {
  args: {
    currentDepartment: "Operations",
    departmentStats: {
      Engineering: { total: 145, active: 140 }, // High activity
      Marketing: { total: 87, active: 65 }, // Medium activity
      Sales: { total: 156, active: 145 }, // High activity
      HR: { total: 34, active: 20 }, // Low activity
      Finance: { total: 67, active: 45 }, // Medium activity
      Operations: { total: 123, active: 95 }, // Medium activity
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Department filter showing mixed activity levels across departments. Some departments have higher percentages of active employees than others.",
      },
    },
  },
};

// Interactive story for testing hover and click behaviors
export const Interactive: Story = {
  args: {
    departmentStats: sampleStats,
    onDepartmentChange: (department: string) => {
      console.log(`Department changed to: ${department}`);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive version for testing. Click departments to see the selection change and check the Actions panel for callback events.",
      },
    },
  },
};
