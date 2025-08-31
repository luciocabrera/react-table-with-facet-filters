export interface Employee {
  id: number;
  name: string;
  department: string;
  role: string;
  status: string;
  location: string;
  salary: number;
  startDate: string;
  email: string;
  experience: number;
}

export interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiError {
  message: string;
  status: number;
}

// Mock data generators
const departments = ['Engineering', 'Marketing', 'HR', 'Sales', 'Finance'];

const rolesByDepartment: Record<string, string[]> = {
  Engineering: [
    'Senior Developer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
    'DevOps Engineer', 'QA Engineer', 'Software Architect', 'Tech Lead',
    'Principal Engineer', 'Engineering Manager', 'Site Reliability Engineer'
  ],
  Marketing: [
    'Marketing Manager', 'Content Specialist', 'Digital Marketing Specialist', 'SEO Specialist',
    'Social Media Manager', 'Brand Manager', 'Growth Marketing Manager', 'Marketing Analyst',
    'Campaign Manager', 'Product Marketing Manager'
  ],
  HR: [
    'HR Specialist', 'HR Manager', 'Recruiter', 'HR Business Partner',
    'Talent Acquisition Specialist', 'HR Generalist', 'Compensation Analyst',
    'Learning & Development Specialist', 'HR Director'
  ],
  Sales: [
    'Sales Representative', 'Account Manager', 'Sales Manager', 'Business Development Manager',
    'Inside Sales Representative', 'Sales Director', 'Customer Success Manager',
    'Sales Operations Manager', 'Enterprise Account Executive'
  ],
  Finance: [
    'Financial Analyst', 'Accountant', 'Finance Manager', 'Controller',
    'Financial Planning Analyst', 'Treasury Analyst', 'Tax Specialist',
    'Audit Manager', 'CFO', 'Budget Analyst'
  ]
};

const locations = [
  'New York', 'San Francisco', 'Austin', 'Chicago', 'Seattle',
  'Los Angeles', 'Boston', 'Denver', 'Miami', 'Portland',
  'Atlanta', 'Dallas', 'Phoenix', 'Philadelphia', 'San Diego'
];

const statuses = ['Active', 'Inactive', 'On Leave'];

const firstNames = [
  'John', 'Jane', 'Mike', 'Sarah', 'David', 'Emily', 'Chris', 'Lisa',
  'Tom', 'Anna', 'James', 'Mary', 'Robert', 'Jennifer', 'William',
  'Linda', 'Richard', 'Elizabeth', 'Charles', 'Barbara', 'Joseph',
  'Susan', 'Thomas', 'Jessica', 'Daniel', 'Karen', 'Matthew', 'Nancy',
  'Anthony', 'Betty', 'Mark', 'Helen', 'Donald', 'Sandra', 'Steven',
  'Donna', 'Paul', 'Carol', 'Andrew', 'Ruth', 'Joshua', 'Sharon'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
  'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez',
  'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark',
  'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King',
  'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green'
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomDate(startYear: number = 2015, endYear: number = 2024): string {
  const start = new Date(startYear, 0, 1);
  const end = new Date(endYear, 11, 31);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
}

function generateSalary(department: string, role: string): number {
  const baseSalaries: Record<string, [number, number]> = {
    'Engineering': [70000, 180000],
    'Marketing': [45000, 120000],
    'HR': [50000, 110000],
    'Sales': [40000, 150000],
    'Finance': [55000, 140000]
  };

  const [min, max] = baseSalaries[department] || [50000, 100000];
  
  // Adjust based on role seniority
  let multiplier = 1;
  if (role.includes('Senior') || role.includes('Manager')) multiplier = 1.3;
  if (role.includes('Director') || role.includes('Principal')) multiplier = 1.6;
  if (role.includes('Lead') || role.includes('Architect')) multiplier = 1.4;
  if (role.includes('CFO') || role.includes('CTO')) multiplier = 2.0;

  const salary = min + Math.random() * (max - min);
  return Math.round(salary * multiplier / 1000) * 1000; // Round to nearest 1000
}

function generateEmployee(id: number, department: string): Employee {
  const firstName = getRandomElement(firstNames);
  const lastName = getRandomElement(lastNames);
  const role = getRandomElement(rolesByDepartment[department]);
  const startDate = generateRandomDate();
  const experienceYears = Math.floor((new Date().getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24 * 365));

  return {
    id,
    name: `${firstName} ${lastName}`,
    department,
    role,
    status: Math.random() > 0.1 ? 'Active' : getRandomElement(['Inactive', 'On Leave']), // 90% active
    location: getRandomElement(locations),
    salary: generateSalary(department, role),
    startDate,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
    experience: experienceYears
  };
}

// Generate mock data for all departments
const mockEmployeeData: Record<string, Employee[]> = {};

departments.forEach(department => {
  const employeeCount = 950 + Math.floor(Math.random() * 100); // 950-1050 employees per department
  mockEmployeeData[department] = Array.from({ length: employeeCount }, (_, index) => 
    generateEmployee(index + 1 + (departments.indexOf(department) * 1000), department)
  );
});

// Simulate API delay
function simulateApiDelay(): Promise<void> {
  const delay = 200 + Math.random() * 300; // 200-500ms delay
  return new Promise(resolve => setTimeout(resolve, delay));
}

export class EmployeeApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'EmployeeApiError';
  }
}

export const employeeApi = {
  /**
   * Fetch employees by department
   * @param department - The department to filter by
   * @param page - Page number (1-based)
   * @param limit - Number of items per page
   * @returns Promise with employee data
   */
  async getEmployeesByDepartment(
    department: string,
    page: number = 1,
    limit: number = 1000
  ): Promise<ApiResponse<Employee>> {
    await simulateApiDelay();

    // Simulate API errors occasionally (5% chance)
    if (Math.random() < 0.05) {
      throw new EmployeeApiError(500, 'Internal server error occurred while fetching employees');
    }

    if (!departments.includes(department)) {
      throw new EmployeeApiError(400, `Invalid department: ${department}. Valid departments are: ${departments.join(', ')}`);
    }

    const employees = mockEmployeeData[department] || [];
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = employees.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      total: employees.length,
      page,
      limit
    };
  },

  /**
   * Get list of available departments
   * @returns Promise with department list
   */
  async getDepartments(): Promise<string[]> {
    await simulateApiDelay();
    return [...departments];
  },

  /**
   * Get department statistics
   * @returns Promise with department stats
   */
  async getDepartmentStats(): Promise<Record<string, { total: number; active: number }>> {
    await simulateApiDelay();
    
    const stats: Record<string, { total: number; active: number }> = {};
    
    departments.forEach(dept => {
      const employees = mockEmployeeData[dept] || [];
      stats[dept] = {
        total: employees.length,
        active: employees.filter(emp => emp.status === 'Active').length
      };
    });

    return stats;
  }
};

// Export departments for use in components
export { departments };
