export default function WelcomeIndex() {
  return (
    <div className="text-center space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Welcome to Data Filters
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Use the navigation above to explore different filter options for your
        data.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Categories
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Filter your data by different categories and types.
          </p>
        </div>
        <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Price Range
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Set minimum and maximum price filters for your search.
          </p>
        </div>
        <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Date Range
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Filter results by specific date ranges or time periods.
          </p>
        </div>
        <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Status
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Filter items based on their current status or state.
          </p>
        </div>
      </div>
    </div>
  );
}
