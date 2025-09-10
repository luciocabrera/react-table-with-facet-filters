# Storybook Setup for Employee Management Components

This project includes a comprehensive Storybook setup showcasing all the employee management components with interactive examples and documentation.

## 🚀 Quick Start

To run Storybook locally:

```bash
# Install dependencies (if not already done)
npm install

# Start Storybook
npm run storybook
```

Storybook will be available at `http://localhost:6006`

## 📚 Available Stories

### Component Stories

1. **FacetFilterTable** - Advanced data table with filtering
   - Basic table with sample data
   - Large datasets (500+ records)
   - Custom column rendering
   - Empty states
   - Interactive filtering demo

2. **FacetFilter** - Standalone filter component
   - Department, status, and location filters
   - Large dataset virtualization (2000+ items)
   - Search functionality
   - Multi-select capabilities

3. **SuspenseControls** - Async loading demos
   - Different department examples
   - Refresh functionality
   - Loading state management

4. **TableSkeleton & DepartmentFilterSkeleton** - Loading states
   - Animated skeleton placeholders
   - Dark mode support
   - Combined loading scenarios

5. **ComponentsOverview** - Complete showcase
   - All components working together
   - Feature highlights
   - Technical implementation details

## 🔧 Configuration

### Storybook Setup

The Storybook configuration includes:

- **React 19 Support**: Latest React features including the `use` hook
- **TypeScript Integration**: Full type safety and IntelliSense
- **TailwindCSS**: Utility-first styling with dark mode
- **Accessibility Testing**: Built-in a11y addon
- **Vitest Integration**: Story-based testing capabilities

### Special Configuration Notes

Due to React Router 7 integration in the main project, the Storybook setup uses a custom Vite configuration that excludes React Router plugins to prevent conflicts. The main `vite.config.ts` is temporarily renamed during Storybook development.

### File Structure

```
.storybook/
├── main.ts          # Main Storybook configuration
├── preview.ts       # Global story settings and CSS imports
└── vitest.setup.ts  # Testing configuration

app/components/
├── *.stories.tsx    # Individual component stories
└── ComponentsOverview.stories.tsx  # Complete showcase
```

## 🎯 Key Features Demonstrated

### Advanced Table Functionality

- **Faceted Filtering**: Multi-column filtering with search
- **Performance**: Virtualized lists for large datasets
- **Responsive Design**: Mobile-friendly layouts
- **Dark Mode**: Complete theming support

### Async Data Loading

- **React Suspense**: Automatic loading states
- **Server Integration**: Promise-based data fetching
- **Error Boundaries**: Graceful error handling

### Developer Experience

- **TypeScript**: Full type safety
- **Component Documentation**: Comprehensive docs with examples
- **Interactive Controls**: Storybook controls for all props
- **Accessibility**: ARIA compliance and keyboard navigation

## 🧪 Testing

The setup includes Vitest integration for story-based testing:

```bash
# Run story tests
npx vitest --project=storybook

# Run with coverage
npx vitest --project=storybook --coverage
```

## 📖 Usage Examples

### Basic Table Implementation

```tsx
import { FacetFilterTable } from "./components/FacetFilterTable";

const columns = [
  { key: "name", label: "Name", filterable: true },
  { key: "department", label: "Department", filterable: true },
  { key: "status", label: "Status", filterable: true },
];

<FacetFilterTable data={employees} columns={columns} />;
```

### Async Data Loading

```tsx
import { AsyncFacetFilterTable } from "./components/AsyncFacetFilterTable";

const employeePromise = fetchEmployees("Engineering");

<Suspense fallback={<TableSkeleton />}>
  <AsyncFacetFilterTable
    employeeDataPromise={employeePromise}
    department="Engineering"
    columns={columns}
  />
</Suspense>;
```

### Individual Filter Usage

```tsx
import { FacetFilter } from "./components/FacetFilter";

<FacetFilter
  column="Department"
  values={departments}
  selectedValues={selectedDepartments}
  onFilterChange={handleFilterChange}
  searchTerm={searchTerm}
  onSearchChange={handleSearchChange}
/>;
```

## 🎨 Customization

### Styling

- Components use Tailwind CSS classes
- Dark mode support via `dark:` prefixes
- Customizable color schemes
- Responsive breakpoints

### Component Props

- Fully typed interfaces
- Optional callbacks for all interactions
- Configurable column definitions
- Custom render functions support

## 🔗 Related Documentation

- [React Router 7 Documentation](https://reactrouter.com/en/main)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Storybook Documentation](https://storybook.js.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🤝 Contributing

When adding new components or stories:

1. Create component stories in the same directory as the component
2. Follow the naming convention: `ComponentName.stories.tsx`
3. Include comprehensive examples covering different use cases
4. Add proper TypeScript types and documentation
5. Test with both light and dark modes
6. Ensure accessibility compliance

## 📝 Notes

- Storybook runs independently of the main React Router application
- All router-dependent functionality is mocked in stories
- Component stories demonstrate both basic and advanced usage patterns
- Performance testing is included for large datasets
