/**
 * Async employee API that returns promises for Suspense integration
 */
import {
  ServerEmployeeApi,
  type Employee,
  type ApiResponse,
  type DepartmentStats,
} from "./serverEmployeeApi";

/**
 * Promise-based API for client-side data fetching with Suspense
 */
export class AsyncEmployeeApi {
  private static cache = new Map<string, any>();

  /**
   * Get employees by department - returns a promise for Suspense
   */
  static getEmployeesByDepartmentAsync(
    department: string
  ): Promise<ApiResponse<Employee>> {
    const cacheKey = `employees-${department}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const promise = this.fetchEmployeesByDepartment(department);
    this.cache.set(cacheKey, promise);

    return promise;
  }

  /**
   * Get department stats - returns a promise for Suspense
   */
  static getDepartmentStatsAsync(): Promise<DepartmentStats> {
    const cacheKey = "department-stats";

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const promise = this.fetchDepartmentStats();
    this.cache.set(cacheKey, promise);

    return promise;
  }

  /**
   * Clear cache for fresh data
   */
  static clearCache(key?: string) {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }

  /**
   * Internal fetch method for employees
   */
  private static async fetchEmployeesByDepartment(
    department: string
  ): Promise<ApiResponse<Employee>> {
    try {
      // Simulate network delay for demonstration
      await new Promise((resolve) => setTimeout(resolve, 500));

      // In a real app, this would make an API call
      // For now, we'll simulate with mock data since we don't have authentication cookies in client
      return this.generateMockEmployeeData(department);
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw error;
    }
  }

  /**
   * Internal fetch method for department stats
   */
  private static async fetchDepartmentStats(): Promise<DepartmentStats> {
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Generate mock department stats
      return this.generateMockDepartmentStats();
    } catch (error) {
      console.error("Error fetching department stats:", error);
      throw error;
    }
  }

  /**
   * Generate mock employee data (for demonstration)
   */
  private static generateMockEmployeeData(
    department: string
  ): ApiResponse<Employee> {
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
    const employees: Employee[] = [];

    for (let i = 1; i <= Math.min(employeeCount, 50); i++) {
      // Limit to 50 for demo
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

  /**
   * Generate mock department stats
   */
  private static generateMockDepartmentStats(): DepartmentStats {
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
