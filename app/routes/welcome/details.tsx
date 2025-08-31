import { useLoaderData } from "react-router";
import type { Route } from "./+types/details";

// Simulate different data structures for each filter type
const mockData = {
  categories: {
    title: "Categories Filter",
    description: "Filter your data by different categories and types.",
    data: [
      { id: 1, name: "Electronics", count: 145, color: "blue" },
      { id: 2, name: "Clothing", count: 89, color: "green" },
      { id: 3, name: "Books", count: 67, color: "purple" },
      { id: 4, name: "Home & Garden", count: 234, color: "orange" },
    ],
    totalItems: 535,
  },
  "price-range": {
    title: "Price Range Filter",
    description: "Set minimum and maximum price filters for your search.",
    data: {
      ranges: [
        { label: "Under $25", min: 0, max: 25, count: 78 },
        { label: "$25 - $50", min: 25, max: 50, count: 156 },
        { label: "$50 - $100", min: 50, max: 100, count: 234 },
        { label: "$100 - $250", min: 100, max: 250, count: 189 },
        { label: "Over $250", min: 250, max: null, count: 43 },
      ],
      currentRange: { min: 0, max: 1000 },
    },
  },
  "date-range": {
    title: "Date Range Filter",
    description: "Filter results by specific date ranges or time periods.",
    data: {
      presets: [
        { label: "Last 7 days", days: 7, count: 23 },
        { label: "Last 30 days", days: 30, count: 145 },
        { label: "Last 3 months", days: 90, count: 456 },
        { label: "Last year", days: 365, count: 1234 },
      ],
      customRange: {
        start: "2024-01-01",
        end: "2024-12-31",
      },
    },
  },
  status: {
    title: "Status Filter",
    description: "Filter items based on their current status or state.",
    data: [
      { id: "active", name: "Active", count: 189, color: "green" },
      { id: "inactive", name: "Inactive", count: 45, color: "gray" },
      { id: "pending", name: "Pending", count: 67, color: "yellow" },
      { id: "archived", name: "Archived", count: 23, color: "red" },
    ],
  },
};

export async function loader({ params }: Route.LoaderArgs) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const filterType = params.type;

  // Check if the filter type exists
  if (!filterType || !(filterType in mockData)) {
    throw new Response("Filter type not found", { status: 404 });
  }

  return {
    filterType,
    ...mockData[filterType as keyof typeof mockData],
  };
}

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `${data?.title || "Filter"} - Data Filters` },
    { name: "description", content: data?.description || "Filter your data" },
  ];
}

export default function Details() {
  const data = useLoaderData<typeof loader>();

  const renderContent = () => {
    switch (data.filterType) {
      case "categories":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.data.map((category: any) => (
                <div
                  key={category.id}
                  className={`p-4 rounded-lg border-2 border-${category.color}-200 bg-${category.color}-50 dark:bg-${category.color}-900/20`}
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {category.count} items
                  </p>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="font-medium">Total Items: {data.totalItems}</p>
            </div>
          </div>
        );

      case "price-range":
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              {data.data.ranges.map((range: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <span className="font-medium">{range.label}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {range.count} items
                  </span>
                </div>
              ))}
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-blue-800 dark:text-blue-200">
                Current Range: ${data.data.currentRange.min} - $
                {data.data.currentRange.max}
              </p>
            </div>
          </div>
        );

      case "date-range":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.data.presets.map((preset: any, index: number) => (
                <div
                  key={index}
                  className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
                >
                  <h3 className="font-semibold text-purple-900 dark:text-purple-100">
                    {preset.label}
                  </h3>
                  <p className="text-purple-700 dark:text-purple-300">
                    {preset.count} items
                  </p>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="font-medium">
                Custom Range: {data.data.customRange.start} to{" "}
                {data.data.customRange.end}
              </p>
            </div>
          </div>
        );

      case "status":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.data.map((status: any) => (
              <div
                key={status.id}
                className={`p-6 rounded-lg border-2 border-${status.color}-200 bg-${status.color}-50 dark:bg-${status.color}-900/20`}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {status.name}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {status.count} items
                </p>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Unknown filter type: {data.filterType}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {data.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">{data.description}</p>
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
        <p className="text-green-800 dark:text-green-200 text-sm">
          <strong>Data loaded for:</strong> {data.filterType} (simulated API
          call with 300ms delay)
        </p>
      </div>

      {renderContent()}
    </div>
  );
}
