import type { Meta, StoryObj } from "@storybook/react";
import { FacetFilterTable } from "./FacetFilterTable";
import type { TableColumn, FacetFilterTableProps } from "./FacetFilterTable";

// Sample data for the table
const sampleEmployees = [
  {
    id: "emp-1",
    name: "John Doe",
    email: "john.doe@company.com",
    role: "Senior Developer",
    department: "Engineering",
    status: "Active" as const,
    location: "New York",
    salary: 95000,
    experience: 5,
    startDate: "2019-03-15",
  },
  {
    id: "emp-2",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    role: "Marketing Manager",
    department: "Marketing",
    status: "Active" as const,
    location: "San Francisco",
    salary: 85000,
    experience: 8,
    startDate: "2017-06-20",
  },
  {
    id: "emp-3",
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    role: "Frontend Developer",
    department: "Engineering",
    status: "On Leave" as const,
    location: "Remote",
    salary: 80000,
    experience: 3,
    startDate: "2021-01-10",
  },
  {
    id: "emp-4",
    name: "Sarah Wilson",
    email: "sarah.wilson@company.com",
    role: "Sales Representative",
    department: "Sales",
    status: "Active" as const,
    location: "London",
    salary: 70000,
    experience: 2,
    startDate: "2022-04-12",
  },
  {
    id: "emp-5",
    name: "David Brown",
    email: "david.brown@company.com",
    role: "DevOps Engineer",
    department: "Engineering",
    status: "Inactive" as const,
    location: "Toronto",
    salary: 90000,
    experience: 6,
    startDate: "2018-09-03",
  },
  {
    id: "emp-6",
    name: "Lisa Garcia",
    email: "lisa.garcia@company.com",
    role: "HR Specialist",
    department: "HR",
    status: "Active" as const,
    location: "Berlin",
    salary: 65000,
    experience: 4,
    startDate: "2020-11-08",
  },
];

// Generate larger dataset for testing performance
const generateLargeDataset = (count: number) => {
  const departments = [
    "Engineering",
    "Marketing",
    "Sales",
    "HR",
    "Finance",
    "Operations",
  ];
  const roles = [
    "Developer",
    "Manager",
    "Specialist",
    "Analyst",
    "Coordinator",
    "Lead",
  ];
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
  const statuses = ["Active", "Inactive", "On Leave"] as const;
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

  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    return {
      id: `emp-${i + 1}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
      role: roles[Math.floor(Math.random() * roles.length)],
      department: departments[Math.floor(Math.random() * departments.length)],
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

// Column definitions
const basicColumns: TableColumn<(typeof sampleEmployees)[0]>[] = [
  { key: "name", label: "Name", filterable: true },
  { key: "email", label: "Email", filterable: false },
  { key: "role", label: "Role", filterable: true },
  { key: "department", label: "Department", filterable: true },
  { key: "status", label: "Status", filterable: true },
  { key: "location", label: "Location", filterable: true },
];

const fullColumns: TableColumn<(typeof sampleEmployees)[0]>[] = [
  { key: "name", label: "Name", filterable: true },
  { key: "email", label: "Email", filterable: false },
  { key: "role", label: "Role", filterable: true },
  { key: "department", label: "Department", filterable: true },
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

const meta: Meta<typeof FacetFilterTable> = {
  title: "Components/FacetFilterTable",
  component: FacetFilterTable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A powerful table component with faceted filtering capabilities. Each filterable column has a dropdown filter with search functionality and multi-select options.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    data: {
      description: "Array of data objects to display in the table",
      control: { type: "object" },
    },
    columns: {
      description:
        "Column configuration array defining which columns to show and their properties",
      control: { type: "object" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    data: sampleEmployees,
    columns: basicColumns,
  },
  parameters: {
    docs: {
      description: {
        story: "Basic table with essential columns and filtering capabilities.",
      },
    },
  },
};

export const FullFeatures: Story = {
  args: {
    data: sampleEmployees,
    columns: fullColumns,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Table with all columns including custom rendering for salary values.",
      },
    },
  },
};

export const EmptyState: Story = {
  args: {
    data: [],
    columns: basicColumns,
  },
  parameters: {
    docs: {
      description: {
        story: "Table with no data to show the empty state message.",
      },
    },
  },
};

export const SingleRecord: Story = {
  args: {
    data: [sampleEmployees[0]],
    columns: fullColumns,
  },
  parameters: {
    docs: {
      description: {
        story: "Table with only one record to test minimal data scenarios.",
      },
    },
  },
};

export const LargeDataset: Story = {
  args: {
    data: generateLargeDataset(500),
    columns: fullColumns,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Table with 500 records to test performance and virtualization of the facet filters.",
      },
    },
  },
};

export const OnlyNonFilterableColumns: Story = {
  args: {
    data: sampleEmployees,
    columns: [
      { key: "name", label: "Name", filterable: false },
      { key: "email", label: "Email", filterable: false },
      { key: "role", label: "Role", filterable: false },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Table with no filterable columns to show the basic table without filter controls.",
      },
    },
  },
};

export const ManyFilterableColumns: Story = {
  args: {
    data: generateLargeDataset(100),
    columns: [
      { key: "name", label: "Name", filterable: true },
      { key: "role", label: "Role", filterable: true },
      { key: "department", label: "Department", filterable: true },
      { key: "status", label: "Status", filterable: true },
      { key: "location", label: "Location", filterable: true },
      { key: "experience", label: "Experience", filterable: true },
      {
        key: "salary",
        label: "Salary Range",
        filterable: true,
        render: (value: number) => {
          if (value < 60000) return "Entry Level";
          if (value < 80000) return "Mid Level";
          if (value < 100000) return "Senior Level";
          return "Executive Level";
        },
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Table with many filterable columns to test the UI with multiple filter dropdowns.",
      },
    },
  },
};

// Interactive story to demonstrate filtering
export const InteractiveDemo: Story = {
  args: {
    data: generateLargeDataset(200),
    columns: fullColumns,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive demo with 200 records. Try filtering by department, status, or location to see how the facet filters work together.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    // This could include automated interactions for testing
    // For now, it's just a manual interactive demo
  },
};
