import { useState, useMemo, useRef, useEffect } from "react";
import { FacetFilter } from "./FacetFilter";

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  filterable: boolean;
  render?: (value: any) => string | React.ReactNode;
}

export interface FacetFilterTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
}

interface FilterState {
  [key: string]: string[];
}

export function FacetFilterTable<T extends Record<string, any>>({
  data,
  columns,
}: FacetFilterTableProps<T>) {
  const [filters, setFilters] = useState<FilterState>({});
  const [searchTerms, setSearchTerms] = useState<Record<string, string>>({});

  console.log("FacetFilterTable", { filters, searchTerms });

  // Get unique values for each filterable column
  const columnValues = useMemo(() => {
    const values: Record<string, string[]> = {};

    columns.forEach((column) => {
      if (column.filterable) {
        const uniqueValues = Array.from(
          new Set(data.map((item) => String(item[column.key])).filter(Boolean))
        ).sort();
        values[String(column.key)] = uniqueValues;
      }
    });

    return values;
  }, [data, columns]);

  // Filter data based on selected filters
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return Object.entries(filters).every(([column, selectedValues]) => {
        if (selectedValues.length === 0) return true;
        return selectedValues.includes(String(item[column]));
      });
    });
  }, [data, filters]);

  const handleFilterChange = (column: string, selectedValues: string[]) => {
    setFilters((prev) => ({
      ...prev,
      [column]: selectedValues,
    }));
  };

  const handleSearchChange = (column: string, term: string) => {
    setSearchTerms((prev) => ({
      ...prev,
      [column]: term,
    }));
  };

  const clearAllFilters = () => {
    setFilters({});
    setSearchTerms({});
  };

  const activeFiltersCount = Object.values(filters).reduce(
    (count, values) => count + values.length,
    0
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Filter Summary */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Showing {filteredData.length} of {data.length} records
            </span>
            {activeFiltersCount > 0 && (
              <span className="text-sm text-blue-600 dark:text-blue-400">
                ({activeFiltersCount} filter
                {activeFiltersCount === 1 ? "" : "s"} active)
              </span>
            )}
          </div>
          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  <div className="flex items-center space-x-2">
                    <span>{column.label}</span>
                    {column.filterable && (
                      <FacetFilter
                        column={String(column.key)}
                        values={columnValues[String(column.key)] || []}
                        selectedValues={filters[String(column.key)] || []}
                        onFilterChange={handleFilterChange}
                        searchTerm={searchTerms[String(column.key)] || ""}
                        onSearchChange={(term) =>
                          handleSearchChange(String(column.key), term)
                        }
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
            {filteredData.map((item, index) => (
              <tr
                key={item.id || index}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
                  >
                    {column.render ?
                      column.render(item[column.key])
                    : String(item[column.key] || "")}
                  </td>
                ))}
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  No data matches your current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
