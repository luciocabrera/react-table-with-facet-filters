# Suspense Implementation with React Router v7

This project demonstrates proper Suspense implementation using React Router v7, the React `use` hook, and skeleton fallbacks with **server-side promises**.

## 🎯 **Key Architecture - Server Promises**

### 1. **Loader Returns Promise** - Server-Side Promise Creation

```typescript
export async function loader({ request }: Route.LoaderArgs) {
  const department = url.searchParams.get("department");

  if (!department) {
    return { employees: null, department: null, departmentStats, error: null };
  }

  // Return the promise directly - DON'T await it
  const employeesPromise = ServerEmployeeApi.getEmployeesByDepartment(
    department,
    request
  );

  return {
    employees: employeesPromise, // ← Promise returned from loader
    department,
    departmentStats,
    error: null,
  };
}
```

### 2. **AsyncFacetFilterTable** - Component with React `use` Hook

```typescript
export function AsyncFacetFilterTable({
  employeeDataPromise, // ← Promise from loader
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
```

### 3. **Suspense with Server Promise**

```typescript
const { employees, department, departmentStats, error } = useLoaderData<typeof loader>();

{department && employees && (
  <Suspense fallback={<TableSkeleton />}>
    <AsyncFacetFilterTable
      employeeDataPromise={employees} // ← Promise from loader
      department={department}
      columns={columns}
    />
  </Suspense>
)}
```

## 🔧 **How It Works**

1. **Server Loader**: Creates promise and returns it (doesn't await)
2. **Client Component**: Receives promise from `useLoaderData()`
3. **Suspense Boundary**: `<Suspense fallback={<TableSkeleton />}>` shows skeleton while loading
4. **React `use` Hook**: `use(employeesPromise)` unwraps the server promise
5. **Authentication**: Server-side cookie extraction ensures secure data access

## 🎬 **Demo Flow**

1. **Navigate to `/table?department=Engineering`** - URL contains department parameter
2. **Loader Runs**: Server extracts cookies, creates authenticated promise
3. **Suspense Shows**: TableSkeleton displays while promise resolves
4. **Data Loads**: AsyncFacetFilterTable renders with employee data
5. **Filtering Works**: FacetFilterTable provides interactive filtering

## 🏗 **Architecture Benefits**

- **Server-Side Authentication**: Cookies extracted in loader for secure API calls
- **Client-Side Rendering**: Suspense handles async data gracefully
- **Type Safety**: Full TypeScript support for promises and data
- **Performance**: No client-side API setup needed
- **SEO Friendly**: Server-side promise creation supports SSR

## 📊 **Data Flow**

```
URL → Loader (Server) → Promise → useLoaderData → Suspense → use() → UI
                ↓                        ↓           ↓
         Auth Cookies              TableSkeleton   Promise Resolves
                ↓                        ↓           ↓
      ServerEmployeeApi          React Suspense   FacetFilterTable
```

## 🚀 **Production Considerations**

- **Error Boundaries**: Add error boundaries around Suspense for error handling
- **Loading States**: Customize skeleton components for different scenarios
- **Authentication**: Server-side cookie management handles auth seamlessly
- **Caching**: Consider React Router's built-in loader caching
- **Network Optimization**: Server promises are created once per navigation

## 🧪 **Testing the Implementation**

1. Visit: `http://localhost:5176/table`
2. Select different departments via URL parameters
3. Watch TableSkeleton appear briefly during loading
4. Observe server authentication logs in terminal
5. Test filtering functionality once data loads

## 🔑 **Key Differences from Client-Side Promises**

- ✅ **Server Authentication**: Uses cookies from Lambda/server
- ✅ **No Client API**: No need for AsyncEmployeeApi or client-side promise management
- ✅ **Loader Integration**: Promises created in React Router loader
- ✅ **Type Safety**: Promise typing flows through loader → component
- ✅ **Simplified Architecture**: One less abstraction layer
