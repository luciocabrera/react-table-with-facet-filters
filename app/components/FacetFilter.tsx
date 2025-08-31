import { useState, useRef, useEffect, useMemo, useCallback } from "react";

interface FacetFilterProps {
  column: string;
  values: string[];
  selectedValues: string[];
  onFilterChange: (column: string, selectedValues: string[]) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

interface VirtualizedListProps {
  items: string[];
  selectedValues: string[];
  onCheckboxChange: (value: string, checked: boolean) => void;
  height: number;
  itemHeight: number;
}

function VirtualizedCheckboxList({
  items,
  selectedValues,
  onCheckboxChange,
  height,
  itemHeight,
}: VirtualizedListProps) {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollElementRef = useRef<HTMLDivElement>(null);

  // Calculate visible range
  const { startIndex, endIndex, visibleItems, offsetY } = useMemo(() => {
    const containerHeight = height;
    const totalItems = items.length;

    // Calculate how many items can fit in the visible area
    const visibleCount = Math.ceil(containerHeight / itemHeight);

    // Add buffer items above and below for smooth scrolling
    const bufferSize = 5;
    const startIdx = Math.max(
      0,
      Math.floor(scrollTop / itemHeight) - bufferSize
    );
    const endIdx = Math.min(
      totalItems,
      startIdx + visibleCount + bufferSize * 2
    );

    // Calculate the offset for the visible items container
    const offsetTop = startIdx * itemHeight;

    // Get the visible items slice
    const visible = items.slice(startIdx, endIdx);

    return {
      startIndex: startIdx,
      endIndex: endIdx,
      visibleItems: visible,
      offsetY: offsetTop,
    };
  }, [items, scrollTop, height, itemHeight]);

  // Handle scroll events
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  // Reset scroll when items change (e.g., after search)
  useEffect(() => {
    if (scrollElementRef.current) {
      scrollElementRef.current.scrollTop = 0;
      setScrollTop(0);
    }
  }, [items.length]);

  const totalHeight = items.length * itemHeight;

  return (
    <div
      ref={scrollElementRef}
      className="overflow-y-auto"
      style={{ height }}
      onScroll={handleScroll}
    >
      {/* Total height container to maintain scrollbar size */}
      <div style={{ height: totalHeight, position: "relative" }}>
        {/* Visible items container */}
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {visibleItems.map((value, index) => {
            const actualIndex = startIndex + index;
            return (
              <label
                key={`${value}-${actualIndex}`}
                className="flex items-center space-x-2 text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-1 rounded"
                style={{ height: itemHeight }}
              >
                <input
                  type="checkbox"
                  checked={selectedValues.includes(value)}
                  onChange={(e) => onCheckboxChange(value, e.target.checked)}
                  className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 flex-shrink-0"
                />
                <span className="text-gray-900 dark:text-gray-100 truncate flex-1">
                  {value}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function FacetFilter({
  column,
  values,
  selectedValues,
  onFilterChange,
  searchTerm,
  onSearchChange,
}: FacetFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Memoize filtered values for performance
  const filteredValues = useMemo(() => {
    return values.filter((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [values, searchTerm]);

  const handleCheckboxChange = useCallback(
    (value: string, checked: boolean) => {
      let newSelectedValues;
      if (checked) {
        newSelectedValues = [...selectedValues, value];
      } else {
        newSelectedValues = selectedValues.filter((v) => v !== value);
      }
      onFilterChange(column, newSelectedValues);
    },
    [selectedValues, onFilterChange, column]
  );

  const handleSelectAll = useCallback(() => {
    onFilterChange(column, filteredValues);
  }, [onFilterChange, column, filteredValues]);

  const handleClearAll = useCallback(() => {
    onFilterChange(column, []);
  }, [onFilterChange, column]);

  // Virtualization settings
  const ITEM_HEIGHT = 32; // Height of each checkbox item in pixels
  const CONTAINER_HEIGHT = 240; // max-h-60 = 240px
  const shouldVirtualize = filteredValues.length > 20; // Only virtualize for large lists

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          selectedValues.length > 0 ?
            "text-blue-600 dark:text-blue-400"
          : "text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
        }`}
        title={`Filter ${column}`}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
          />
        </svg>
        {selectedValues.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {selectedValues.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute top-8 left-0 z-50 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-4"
        >
          {/* Search Input */}
          <div className="mb-3">
            <input
              type="text"
              placeholder={`Search ${column.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mb-3">
            <button
              onClick={handleSelectAll}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              Select All ({filteredValues.length})
            </button>
            <button
              onClick={handleClearAll}
              className="text-xs text-gray-600 dark:text-gray-400 hover:underline"
            >
              Clear All
            </button>
          </div>

          {/* Performance Info for large lists */}
          {shouldVirtualize && (
            <div className="mb-2 px-2 py-1 bg-blue-50 dark:bg-blue-900/20 rounded text-xs text-blue-600 dark:text-blue-400">
              📊 Virtualized ({filteredValues.length} items) - Smooth scrolling
              enabled
            </div>
          )}

          {/* Checkbox List - Virtualized or Regular */}
          <div className="max-h-60">
            {filteredValues.length === 0 ?
              <div className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
                No items match your search
              </div>
            : shouldVirtualize ?
              <VirtualizedCheckboxList
                items={filteredValues}
                selectedValues={selectedValues}
                onCheckboxChange={handleCheckboxChange}
                height={CONTAINER_HEIGHT}
                itemHeight={ITEM_HEIGHT}
              />
            : <div className="overflow-y-auto max-h-60">
                <div className="space-y-1">
                  {filteredValues.map((value) => (
                    <label
                      key={value}
                      className="flex items-center space-x-2 text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-1 rounded"
                      style={{ minHeight: ITEM_HEIGHT }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedValues.includes(value)}
                        onChange={(e) =>
                          handleCheckboxChange(value, e.target.checked)
                        }
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 flex-shrink-0"
                      />
                      <span className="text-gray-900 dark:text-gray-100 truncate flex-1">
                        {value}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            }
          </div>
        </div>
      )}
    </div>
  );
}
