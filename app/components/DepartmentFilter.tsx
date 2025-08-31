import { useSearchParams, useNavigate } from "react-router";
import { departments } from "../services/employeeApi";

interface DepartmentFilterProps {
  currentDepartment?: string;
  onDepartmentChange?: (department: string) => void;
  departmentStats?: Record<string, { total: number; active: number }>;
}

export function DepartmentFilter({ 
  currentDepartment, 
  onDepartmentChange,
  departmentStats 
}: DepartmentFilterProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleDepartmentClick = (department: string) => {
    // Update URL with new department parameter
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('department', department);
    navigate(`/table?${newSearchParams.toString()}`);
    
    // Call optional callback
    onDepartmentChange?.(department);
  };

  const handlePrefetch = (department: string) => {
    // Prefetch data for better UX (we'll implement this later)
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
            {departmentStats[currentDepartment]?.active || 0} active / {' '}
            {departmentStats[currentDepartment]?.total || 0} total employees
          </div>
        )}
      </div>
      
      <div className="flex flex-wrap gap-3">
        {departments.map((department) => {
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
                ${isActive 
                  ? 'bg-blue-600 text-white shadow-md transform scale-105' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
                }
              `}
            >
              <span className="relative z-10">{department}</span>
              
              {/* Stats tooltip */}
              {stats && !isActive && (
                <div className="absolute invisible group-hover:visible group-focus:visible opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-md shadow-lg whitespace-nowrap z-20">
                  <div className="text-center">
                    <div className="font-semibold">{stats.total} employees</div>
                    <div className="text-gray-300">{stats.active} active</div>
                  </div>
                  {/* Arrow */}
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
              <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Select a department to view employees
              </h3>
              <div className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                Choose one of the department buttons above to load employee data for that department.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
