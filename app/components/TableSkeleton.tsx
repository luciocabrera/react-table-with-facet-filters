export function TableSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-pulse">
      {/* Filter Summary Skeleton */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-48"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-32"></div>
          </div>
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-24"></div>
        </div>
      </div>

      {/* Table Header Skeleton */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {Array.from({ length: 7 }).map((_, index) => (
                <th key={index} className="px-6 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-16"></div>
                    <div className="h-4 w-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
            {Array.from({ length: 10 }).map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                {Array.from({ length: 7 }).map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full max-w-[120px]"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function DepartmentFilterSkeleton() {
  return (
    <div className="mb-6 animate-pulse">
      <div className="flex flex-wrap gap-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-10 bg-gray-200 dark:bg-gray-600 rounded-md w-24"
          ></div>
        ))}
      </div>
    </div>
  );
}
