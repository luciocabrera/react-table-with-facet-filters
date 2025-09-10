import type { Meta, StoryObj } from "@storybook/react";
import { FacetFilterTable } from "./FacetFilterTable";
import { FacetFilter } from "./FacetFilter";
import { SuspenseControls } from "./SuspenseControls";
import { TableSkeleton, DepartmentFilterSkeleton } from "./TableSkeleton";
import type { TableColumn } from "./FacetFilterTable";

// Sample data for the overview
const generateSampleEmployees = (count: number) => {
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

const sampleData = generateSampleEmployees(100);

const columns: TableColumn<(typeof sampleData)[0]>[] = [
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

// Overview component that showcases all components
const ComponentsOverview = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Employee Management Components
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          A comprehensive set of React components for employee data management
          with advanced filtering capabilities.
        </p>
      </div>

      {/* Component Showcase */}
      <div className="grid gap-8">
        {/* Suspense Controls Demo */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            🔄 Suspense Controls
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Demo controls for React Suspense functionality with server-side data
            loading.
          </p>
          <SuspenseControls department="Engineering" />
        </section>

        {/* Loading States Demo */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            ⏳ Loading States
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Skeleton components that maintain layout during data loading.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                Department Filter Loading
              </h3>
              <DepartmentFilterSkeleton />
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                Table Loading
              </h3>
              <TableSkeleton />
            </div>
          </div>
        </section>

        {/* Individual Facet Filter Demo */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            🔍 Individual Facet Filter
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Advanced filter component with search, multi-select, and
            virtualization for large datasets.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Department
                </span>
                <FacetFilter
                  column="Department"
                  values={[
                    "Engineering",
                    "Marketing",
                    "Sales",
                    "HR",
                    "Finance",
                    "Operations",
                  ]}
                  selectedValues={["Engineering"]}
                  onFilterChange={(column, values) =>
                    console.log(`${column}:`, values)
                  }
                  searchTerm=""
                  onSearchChange={(term) => console.log("Search:", term)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </span>
                <FacetFilter
                  column="Status"
                  values={["Active", "Inactive", "On Leave"]}
                  selectedValues={["Active"]}
                  onFilterChange={(column, values) =>
                    console.log(`${column}:`, values)
                  }
                  searchTerm=""
                  onSearchChange={(term) => console.log("Search:", term)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Location
                </span>
                <FacetFilter
                  column="Location"
                  values={[
                    "New York",
                    "San Francisco",
                    "London",
                    "Toronto",
                    "Berlin",
                    "Sydney",
                    "Tokyo",
                    "Remote",
                  ]}
                  selectedValues={[]}
                  onFilterChange={(column, values) =>
                    console.log(`${column}:`, values)
                  }
                  searchTerm=""
                  onSearchChange={(term) => console.log("Search:", term)}
                />
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded text-sm">
              <strong>Interactive Demo:</strong> Click the filter icons above to
              see the dropdown functionality. Check the browser console for
              filter change events.
            </div>
          </div>
        </section>

        {/* Full Table Demo */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            📊 Complete Filterable Table
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Full-featured data table with integrated facet filtering, search,
            and real-time data manipulation.
          </p>

          <FacetFilterTable data={sampleData} columns={columns} />
        </section>

        {/* Features Summary */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-xl">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            ✨ Key Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                Advanced Filtering
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Multi-select facet filters with search functionality and smart
                positioning.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2">
                Performance Optimized
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Virtualized lists for large datasets and efficient rendering.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">
                Async Ready
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Built-in support for React Suspense and async data loading.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">
                Responsive Design
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Mobile-friendly layouts with dark mode support.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-red-600 dark:text-red-400 mb-2">
                TypeScript Native
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Fully typed with excellent IntelliSense support.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-teal-600 dark:text-teal-400 mb-2">
                Accessible
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                ARIA-compliant with keyboard navigation support.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            🔧 Technical Implementation
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Component Architecture
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>
                  • <strong>FacetFilterTable:</strong> Main table component with
                  integrated filtering
                </li>
                <li>
                  • <strong>FacetFilter:</strong> Standalone filter component
                  with virtualization
                </li>
                <li>
                  • <strong>AsyncFacetFilterTable:</strong> Suspense-enabled
                  async data loading
                </li>
                <li>
                  • <strong>TableSkeleton:</strong> Loading states and
                  placeholders
                </li>
                <li>
                  • <strong>SuspenseControls:</strong> Demo controls for async
                  operations
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Technology Stack
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>
                  • <strong>React 19:</strong> Latest React features including
                  the `use` hook
                </li>
                <li>
                  • <strong>TypeScript:</strong> Full type safety and developer
                  experience
                </li>
                <li>
                  • <strong>Tailwind CSS:</strong> Utility-first styling with
                  dark mode
                </li>
                <li>
                  • <strong>React Router 7:</strong> Modern routing with data
                  loading
                </li>
                <li>
                  • <strong>Vite:</strong> Fast development and build tooling
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const meta: Meta<typeof ComponentsOverview> = {
  title: "Overview/Component Showcase",
  component: ComponentsOverview,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A comprehensive overview of all the employee management components, showcasing their features and capabilities in a real-world context.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Complete: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Complete showcase of all components working together with sample data and interactive features.",
      },
    },
  },
};
