import type { Meta, StoryObj } from "@storybook/react";
import { AsyncFacetFilterTable } from "./AsyncFacetFilterTable";
import { Suspense } from "react";
import { TableSkeleton } from "./TableSkeleton";
import type { TableColumn } from "./FacetFilterTable";
import type { Employee, ApiResponse } from "../services/serverEmployeeApi";

// Mock data generation for async stories
const generateMockEmployees = (
  department: string,
  count: number
): Employee[] => {
  const roles = {
    Engineering: [
      "Senior Developer",
      "Frontend Developer",
      "Backend Developer",
      "DevOps Engineer",
      "Tech Lead",
    ],
    Marketing: [
      "Marketing Manager",
      "Content Creator",
      "SEO Specialist",
      "Social Media Manager",
      "Brand Manager",
    ],
    Sales: [
      "Sales Manager",
      "Account Executive",
      "Sales Representative",
      "Business Development",
      "Customer Success",
    ],
    HR: [
      "HR Manager",
      "Recruiter",
      "HR Specialist",
      "Training Coordinator",
      "Compensation Analyst",
    ],
    Finance: [
      "Financial Analyst",
      "Accountant",
      "Controller",
      "Financial Manager",
      "Budget Analyst",
    ],
    Operations: [
      "Operations Manager",
      "Project Manager",
      "Business Analyst",
      "Process Coordinator",
      "Quality Assurance",
    ],
  };

  const locations = [
    "New York",
    "San Francisco",
    "London",
    "Toronto",
    "Berlin",
    "Sydney",
    "Tokyo",
    "Remote",
  ];
  const statuses: Array<"Active" | "Inactive" | "On Leave"> = [
    "Active",
    "Active",
    "Active",
    "Active",
    "Inactive",
    "On Leave",
  ];
  const firstNames = [
    "John",
    "Jane",
    "Mike",
    "Sarah",
    "David",
    "Lisa",
    "Robert",
    "Emily",
    "James",
    "Jessica",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Wilson",
    "Moore",
  ];

  const departmentRoles = roles[department as keyof typeof roles] || [
    "Employee",
  ];

  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    return {
      id: `${department.toLowerCase()}-${i + 1}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
      role: departmentRoles[Math.floor(Math.random() * departmentRoles.length)],
      department,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      salary: Math.floor(Math.random() * 100000) + 50000,
      experience: Math.floor(Math.random() * 15) + 1,
      startDate: new Date(
        2020 + Math.floor(Math.random() * 5),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      )
        .toISOString()
        .split("T")[0],
    };
  });
};

// Mock async data fetchers
const createMockPromise = (
  department: string,
  employeeCount: number,
  delay: number = 1000
): Promise<ApiResponse<Employee>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const employees = generateMockEmployees(department, employeeCount);
      resolve({
        data: employees,
        total: employees.length,
        page: 1,
        limit: employees.length,
      });
    }, delay);
  });
};

// Column definitions
const columns: TableColumn<Employee>[] = [
  { key: "name", label: "Name", filterable: true },
  { key: "email", label: "Email", filterable: false },
  { key: "role", label: "Role", filterable: true },
  { key: "status", label: "Status", filterable: true },
  { key: "location", label: "Location", filterable: true },
  {
    key: "salary",
    label: "Salary",
    filterable: false,
    render: (value: number) => `$${value.toLocaleString()}`,
  },
  { key: "experience", label: "Experience (years)", filterable: true },
  { key: "startDate", label: "Start Date", filterable: false },
];

const meta: Meta<typeof AsyncFacetFilterTable> = {
  title: "Components/AsyncFacetFilterTable",
  component: AsyncFacetFilterTable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "An async version of FacetFilterTable that uses React's `use` hook to handle Promise-based data loading. Designed to work with React Suspense for automatic loading states.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    employeeDataPromise: {
      description: "Promise that resolves to employee data",
      control: false,
    },
    department: {
      description: "The department name for the employee data",
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
    columns: {
      description: "Column configuration for the table",
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <Suspense fallback={<TableSkeleton />}>
        <Story />
      </Suspense>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const QuickLoad: Story = {
  args: {
    employeeDataPromise: createMockPromise("Engineering", 25, 500),
    department: "Engineering",
    columns,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Quick loading demo (500ms delay) with 25 employees. Good for testing the quick transition from loading to loaded state.",
      },
    },
  },
};

export const NormalLoad: Story = {
  args: {
    employeeDataPromise: createMockPromise("Marketing", 50, 2000),
    department: "Marketing",
    columns,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Normal loading speed demo with a 2-second delay to show the skeleton loading state.",
      },
    },
  },
};

export const SlowLoad: Story = {
  args: {
    employeeDataPromise: createMockPromise("Sales", 100, 4000),
    department: "Sales",
    columns,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Slow loading demo with a 4-second delay and larger dataset to test loading state persistence.",
      },
    },
  },
};

export const LargeDataset: Story = {
  args: {
    employeeDataPromise: createMockPromise("Operations", 500, 1500),
    department: "Operations",
    columns,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Large dataset demo showing how the component handles many employees with facet filtering.",
      },
    },
  },
};

export const SmallTeam: Story = {
  args: {
    employeeDataPromise: createMockPromise("HR", 8, 1000),
    department: "HR",
    columns,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Small team demo showing the component with a minimal number of employees.",
      },
    },
  },
};

export const FinanceDepartment: Story = {
  args: {
    employeeDataPromise: createMockPromise("Finance", 75, 1200),
    department: "Finance",
    columns,
  },
  parameters: {
    docs: {
      description: {
        story: "Finance department example with moderate-sized team.",
      },
    },
  },
};
