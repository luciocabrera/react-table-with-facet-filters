import type { Meta, StoryObj } from "@storybook/react";
import { FacetFilter } from "./FacetFilter";
import { useState } from "react";

// Wrapper component to manage state for Storybook
const FacetFilterWrapper = (props: {
  column: string;
  values: string[];
  initialSelectedValues?: string[];
  initialSearchTerm?: string;
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(
    props.initialSelectedValues || []
  );
  const [searchTerm, setSearchTerm] = useState<string>(
    props.initialSearchTerm || ""
  );

  const handleFilterChange = (column: string, newSelectedValues: string[]) => {
    setSelectedValues(newSelectedValues);
    console.log(`Filter changed for ${column}:`, newSelectedValues);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    console.log(`Search term changed:`, term);
  };

  return (
    <div className="p-8">
      <div className="mb-4 text-sm text-gray-600">
        Click the filter icon to open the dropdown. This component is typically
        used inside table headers.
      </div>
      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {props.column}
          </span>
          <FacetFilter
            column={props.column}
            values={props.values}
            selectedValues={selectedValues}
            onFilterChange={handleFilterChange}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded text-sm">
        <div>
          <strong>Selected values:</strong>{" "}
          {selectedValues.length > 0 ? selectedValues.join(", ") : "None"}
        </div>
        <div>
          <strong>Search term:</strong> {searchTerm || "None"}
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof FacetFilter> = {
  title: "Components/FacetFilter",
  component: FacetFilterWrapper,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A sophisticated facet filter component with search functionality, multi-select checkboxes, and virtualization for large datasets. Features include position-aware dropdown placement, search filtering, and performance optimizations.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    column: {
      description: "The column name for this filter",
      control: { type: "text" },
    },
    values: {
      description: "Array of all possible values for this column",
      control: { type: "object" },
    },
    initialSelectedValues: {
      description: "Initially selected values",
      control: { type: "object" },
    },
    initialSearchTerm: {
      description: "Initial search term",
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const departments = [
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
  "Operations",
];
const statuses = ["Active", "Inactive", "On Leave"];
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

// Generate a large list for testing virtualization
const generateLargeList = (count: number) => {
  const prefixes = [
    "Alpha",
    "Beta",
    "Gamma",
    "Delta",
    "Epsilon",
    "Zeta",
    "Eta",
    "Theta",
  ];
  const suffixes = [
    "Corp",
    "Inc",
    "LLC",
    "Ltd",
    "Solutions",
    "Systems",
    "Technologies",
    "Services",
  ];

  return Array.from({ length: count }, (_, i) => {
    const prefix = prefixes[i % prefixes.length];
    const suffix = suffixes[Math.floor(i / prefixes.length) % suffixes.length];
    const number = Math.floor(i / (prefixes.length * suffixes.length)) + 1;
    return `${prefix} ${suffix}${number > 1 ? ` ${number}` : ""}`;
  });
};

export const DepartmentFilter: Story = {
  args: {
    column: "Department",
    values: departments,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Filter for department selection with a small, manageable list of options.",
      },
    },
  },
};

export const StatusFilter: Story = {
  args: {
    column: "Status",
    values: statuses,
    initialSelectedValues: ["Active"],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Status filter with one option pre-selected. Good for testing the selected state visualization.",
      },
    },
  },
};

export const LocationFilter: Story = {
  args: {
    column: "Location",
    values: locations,
    initialSelectedValues: ["New York", "San Francisco"],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Location filter with multiple options pre-selected to demonstrate multi-select functionality.",
      },
    },
  },
};

export const WithSearchTerm: Story = {
  args: {
    column: "Location",
    values: locations,
    initialSearchTerm: "San",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Filter with an initial search term to show how search filtering works.",
      },
    },
  },
};

export const LargeDatasetVirtualized: Story = {
  args: {
    column: "Company",
    values: generateLargeList(500),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Filter with 500 items to demonstrate virtualization. The dropdown uses virtual scrolling for performance with large datasets.",
      },
    },
  },
};

export const VeryLargeDataset: Story = {
  args: {
    column: "Product Code",
    values: generateLargeList(2000),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Filter with 2000 items to test extreme virtualization scenarios. Notice the performance indicator in the dropdown.",
      },
    },
  },
};

export const EmptyValues: Story = {
  args: {
    column: "Empty Column",
    values: [],
  },
  parameters: {
    docs: {
      description: {
        story: "Filter with no available values to show the empty state.",
      },
    },
  },
};

export const SingleValue: Story = {
  args: {
    column: "Single Option",
    values: ["Only Option"],
  },
  parameters: {
    docs: {
      description: {
        story: "Filter with only one available value.",
      },
    },
  },
};

export const AlphabeticalValues: Story = {
  args: {
    column: "Letters",
    values: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    initialSelectedValues: ["A", "B", "C"],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Filter with alphabetical values to test sorting and search functionality.",
      },
    },
  },
};

export const NumberValues: Story = {
  args: {
    column: "Years",
    values: Array.from({ length: 50 }, (_, i) => (2000 + i).toString()),
    initialSelectedValues: ["2023", "2024"],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Filter with numeric values (as strings) to test different data types.",
      },
    },
  },
};
