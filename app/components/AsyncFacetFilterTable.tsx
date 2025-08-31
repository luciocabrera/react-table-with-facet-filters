import { use } from "react";
import { FacetFilterTable, type TableColumn } from "./FacetFilterTable";
import { type Employee, type ApiResponse } from "../services/serverEmployeeApi";

interface AsyncFacetFilterTableProps {
  employeeDataPromise: Promise<ApiResponse<Employee>>;
  department: string;
  columns: TableColumn<Employee>[];
}

export function AsyncFacetFilterTable({
  employeeDataPromise,
  department,
  columns,
}: AsyncFacetFilterTableProps) {
  // Use the React 'use' hook to unwrap the promise
  const employeeResponse = use(employeeDataPromise);

  return (
    <div>
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        <span className="font-semibold">{department}</span> Department -{" "}
        {employeeResponse.total} employees
      </div>
      <FacetFilterTable data={employeeResponse.data} columns={columns} />
    </div>
  );
}
