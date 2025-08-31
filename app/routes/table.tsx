import { Suspense } from "react";
import { useLoaderData, useSearchParams } from "react-router";
import type { Route } from "./+types/table";
import {
  FacetFilterTable,
  AsyncFacetFilterTable,
  SuspenseControls,
  DepartmentFilter,
  TableSkeleton,
  DepartmentFilterSkeleton,
} from "../components";
import { AuthDebugPanel } from "../components/AuthDebugPanel";
import {
  ServerEmployeeApi,
  ClientEmployeeApi,
  type Employee,
  type ApiResponse,
  EmployeeApiError,
} from "../services/serverEmployeeApi";
import {
  isRequestAuthenticated,
  getAccessTokenFromRequest,
} from "../services/serverAuth";
import "../utils/authTest";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: "Employee Data Table with Department Filters" },
    {
      name: "description",
      content:
        "Browse employees by department with advanced filtering capabilities",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const department = url.searchParams.get("department");

  try {
    // Check if request is authenticated
    const isAuthenticated = isRequestAuthenticated(request);
    const token = getAccessTokenFromRequest(request);

    console.log("🔐 Auth check:", { isAuthenticated, hasToken: !!token });

    // Load department stats for the filter component
    const [departmentStats] = await Promise.all([
      ServerEmployeeApi.getDepartmentStats(request),
    ]);

    // If no department selected, just return stats
    if (!department) {
      return {
        employees: null,
        department: null,
        departmentStats,
        error: null,
      };
    }

    // Return the promise directly for Suspense to handle
    const employeesPromise = ServerEmployeeApi.getEmployeesByDepartment(
      department,
      request
    );

    return {
      employees: employeesPromise, // Return the promise, don't await
      department,
      departmentStats,
      error: null,
    };
  } catch (error) {
    console.error("Error loading employee data:", error);

    if (error instanceof EmployeeApiError) {
      return {
        employees: null,
        department,
        departmentStats: {},
        error: {
          message: error.message,
          status: error.status,
        },
      };
    }

    return {
      employees: null,
      department,
      departmentStats: {},
      error: {
        message: "An unexpected error occurred while loading employee data.",
        status: 500,
      },
    };
  }
}

const columns = [
  {
    key: "name" as const,
    label: "Name",
    filterable: true,
  },
  {
    key: "email" as const,
    label: "Email",
    filterable: true,
  },
  {
    key: "role" as const,
    label: "Role",
    filterable: true,
  },
  {
    key: "status" as const,
    label: "Status",
    filterable: true,
  },
  {
    key: "location" as const,
    label: "Location",
    filterable: true,
  },
  {
    key: "salary" as const,
    label: "Salary",
    filterable: false,
    render: (value: number) => `$${value.toLocaleString()}`,
  },
  {
    key: "experience" as const,
    label: "Experience",
    filterable: true,
    render: (value: number) => `${value} year${value !== 1 ? "s" : ""}`,
  },
  {
    key: "startDate" as const,
    label: "Start Date",
    filterable: false,
    render: (value: string) => new Date(value).toLocaleDateString(),
  },
];

function ErrorDisplay({
  error,
}: {
  error: { message: string; status: number };
}) {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
            Error Loading Employee Data
          </h3>
          <div className="mt-1 text-sm text-red-700 dark:text-red-300">
            {error.message}
          </div>
          <div className="mt-3">
            <button
              onClick={() => window.location.reload()}
              className="bg-red-100 dark:bg-red-800 hover:bg-red-200 dark:hover:bg-red-700 text-red-800 dark:text-red-200 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TablePage() {
  const { employees, department, departmentStats, error } =
    useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Employee Data Table
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Browse employees by department with advanced filtering
              capabilities.
            </p>
          </div>

          <AuthDebugPanel />

          <DepartmentFilter
            currentDepartment={department || undefined}
            departmentStats={departmentStats}
          />

          <ErrorDisplay error={error} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Employee Data Table
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Browse employees by department with advanced filtering capabilities.
          </p>
        </div>

        <AuthDebugPanel />

        <DepartmentFilter
          currentDepartment={department || undefined}
          departmentStats={departmentStats}
        />

        <SuspenseControls department={department || undefined} />

        {department && employees && (
          <Suspense fallback={<TableSkeleton />}>
            <AsyncFacetFilterTable
              employeeDataPromise={employees}
              department={department}
              columns={columns}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}
