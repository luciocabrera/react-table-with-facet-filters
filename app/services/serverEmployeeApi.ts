import { createAuthHeaderFromRequest } from "./serverAuth";

export class EmployeeApiError extends Error {
  public readonly status: number;

  constructor(message: string, status: number = 500) {
    super(message);
    this.name = "EmployeeApiError";
    this.status = status;
  }
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "Active" | "Inactive" | "On Leave";
  location: string;
  salary: number;
  experience: number;
  startDate: string;
}

export interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface DepartmentStats {
  [department: string]: {
    total: number;
    active: number;
  };
}

// Available departments
export const departments = [
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
  "Operations",
];

/**
 * Server-side employee API for use in React Router loaders
 * Works with externally managed authentication cookies
 */
export class ServerEmployeeApi {
  /**
   * Get employees by department (server-side with auth from request)
   */
  static async getEmployeesByDepartment(
    department: string,
    request: Request
  ): Promise<ApiResponse<Employee>> {
    const authHeader = createAuthHeaderFromRequest(request);

    if (!authHeader) {
      throw new EmployeeApiError(
        "Access token is required. Please login.",
        401
      );
    }

    try {
      // In a real app, make API call with auth header:
      // const response = await fetch(`/api/employees?department=${department}`, {
      //   headers: {
      //     'Authorization': authHeader,
      //     'Content-Type': 'application/json',
      //   }
      // });

      // For now, return mock data (simulating authenticated access)
      return this._getMockEmployeesByDepartment(department);
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw new EmployeeApiError("Failed to fetch employees", 500);
    }
  }

  /**
   * Get department statistics (server-side with auth from request)
   */
  static async getDepartmentStats(request: Request): Promise<DepartmentStats> {
    const authHeader = createAuthHeaderFromRequest(request);

    if (!authHeader) {
      throw new EmployeeApiError(
        "Access token is required. Please login.",
        401
      );
    }

    try {
      // In a real app, make API call with auth header:
      // const response = await fetch('/api/departments/stats', {
      //   headers: {
      //     'Authorization': authHeader,
      //     'Content-Type': 'application/json',
      //   }
      // });

      // For now, return mock data (simulating authenticated access)
      return this._getMockDepartmentStats();
    } catch (error) {
      console.error("Error fetching department stats:", error);
      throw new EmployeeApiError("Failed to fetch department statistics", 500);
    }
  }

  /**
   * Mock data generation (unchanged from original)
   */
  private static _getMockEmployeesByDepartment(
    department: string
  ): ApiResponse<Employee> {
    const employees: Employee[] = [];
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

    const departmentRoles = roles[department as keyof typeof roles] || [
      "Employee",
    ];
    const employeeCount = Math.floor(Math.random() * 900) + 100; // 100-999 employees per department

    for (let i = 1; i <= employeeCount; i++) {
      const firstName = [
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
      ][Math.floor(Math.random() * 10)];
      const lastName = [
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
      ][Math.floor(Math.random() * 10)];
      const name = `${firstName} ${lastName}`;

      employees.push({
        id: `${department.toLowerCase()}-${i}`,
        name,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
        role: departmentRoles[
          Math.floor(Math.random() * departmentRoles.length)
        ],
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
      });
    }

    return {
      data: employees,
      total: employees.length,
      page: 1,
      limit: employees.length,
    };
  }

  private static _getMockDepartmentStats(): DepartmentStats {
    const departments = [
      "Engineering",
      "Marketing",
      "Sales",
      "HR",
      "Finance",
      "Operations",
    ];
    const stats: DepartmentStats = {};

    departments.forEach((dept) => {
      const total = Math.floor(Math.random() * 900) + 100;
      const active = Math.floor(total * (0.8 + Math.random() * 0.2)); // 80-100% active
      stats[dept] = { total, active };
    });

    return stats;
  }
}

/**
 * Client-side employee API (optional - for components that need to make calls after initial load)
 */
export class ClientEmployeeApi {
  /**
   * Get department stats from client-side (using cookies available to browser)
   */
  static async getDepartmentStats(): Promise<DepartmentStats> {
    try {
      const response = await fetch("/api/departments/stats", {
        credentials: "include", // This will include cookies in the request
      });

      if (!response.ok) {
        throw new EmployeeApiError(
          "Failed to fetch department statistics",
          response.status
        );
      }

      return await response.json();
    } catch (error) {
      // For demo, fall back to mock data
      console.warn("Using mock data - implement real API endpoint");
      return this._getMockDepartmentStats();
    }
  }

  private static _getMockDepartmentStats(): DepartmentStats {
    const departments = [
      "Engineering",
      "Marketing",
      "Sales",
      "HR",
      "Finance",
      "Operations",
    ];
    const stats: DepartmentStats = {};

    departments.forEach((dept) => {
      const total = Math.floor(Math.random() * 900) + 100;
      const active = Math.floor(total * (0.8 + Math.random() * 0.2)); // 80-100% active
      stats[dept] = { total, active };
    });

    return stats;
  }
}
