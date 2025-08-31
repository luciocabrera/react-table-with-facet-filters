import { useState, useMemo } from "react";
import type { Route } from "./+types/table";
import { FacetFilterTable } from "../components/FacetFilterTable";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Data Table with Facet Filters" },
    {
      name: "description",
      content: "Interactive table with multi-select column filters",
    },
  ];
}

// Sample data for demonstration
const sampleData = [
  {
    id: 1,
    name: "John Doe",
    department: "Engineering",
    role: "Senior Developer",
    status: "Active",
    location: "New York",
    salary: 95000,
    startDate: "2021-03-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    department: "Marketing",
    role: "Marketing Manager",
    status: "Active",
    location: "San Francisco",
    salary: 85000,
    startDate: "2020-08-22",
  },
  {
    id: 3,
    name: "Mike Johnson",
    department: "Engineering",
    role: "Frontend Developer",
    status: "Inactive",
    location: "Austin",
    salary: 75000,
    startDate: "2022-01-10",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    department: "HR",
    role: "HR Specialist",
    status: "Active",
    location: "Chicago",
    salary: 65000,
    startDate: "2021-11-05",
  },
  {
    id: 5,
    name: "David Brown",
    department: "Engineering",
    role: "DevOps Engineer",
    status: "Active",
    location: "Seattle",
    salary: 90000,
    startDate: "2021-06-18",
  },
  {
    id: 6,
    name: "Emily Davis",
    department: "Design",
    role: "UX Designer",
    status: "Active",
    location: "Los Angeles",
    salary: 80000,
    startDate: "2022-04-12",
  },
  {
    id: 7,
    name: "Chris Miller",
    department: "Sales",
    role: "Sales Representative",
    status: "Inactive",
    location: "Miami",
    salary: 55000,
    startDate: "2020-12-03",
  },
  {
    id: 8,
    name: "Lisa Anderson",
    department: "Marketing",
    role: "Content Specialist",
    status: "Active",
    location: "Denver",
    salary: 60000,
    startDate: "2022-09-20",
  },
  {
    id: 9,
    name: "Tom Taylor",
    department: "Engineering",
    role: "Backend Developer",
    status: "Active",
    location: "Portland",
    salary: 85000,
    startDate: "2021-07-14",
  },
  {
    id: 10,
    name: "Anna White",
    department: "Finance",
    role: "Financial Analyst",
    status: "Active",
    location: "Boston",
    salary: 70000,
    startDate: "2022-02-28",
  },
];

const columns = [
  {
    key: "name" as const,
    label: "Name",
    filterable: true,
  },
  {
    key: "department" as const,
    label: "Department",
    filterable: true,
  },
  {
    key: "role" as const,
    label: "Role",
    filterable: true,
  },
  {
    key: "status" as const,
    label: "Status",
    filterable: true,
  },
  {
    key: "location" as const,
    label: "Location",
    filterable: true,
  },
  {
    key: "salary" as const,
    label: "Salary",
    filterable: false,
    render: (value: number) => `$${value.toLocaleString()}`,
  },
  {
    key: "startDate" as const,
    label: "Start Date",
    filterable: false,
    render: (value: string) => new Date(value).toLocaleDateString(),
  },
];

export default function TablePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Employee Data Table
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Use the filter buttons in column headers to filter data by multiple
            values.
          </p>
        </div>

        <FacetFilterTable data={sampleData} columns={columns} />
      </div>
    </div>
  );
}
