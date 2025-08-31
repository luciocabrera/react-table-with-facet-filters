# React Table with Facet Filters

A modern, feature-rich table component built with React Router v7 and TypeScript that provides advanced facet filtering capabilities. Filter your data with multi-select dropdowns, search functionality, and real-time updates.

![Table Demo](https://img.shields.io/badge/React_Router-v7-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 🔍 **Advanced Facet Filtering**: Multi-select filters for each column
- 🔎 **Search within Filters**: Quickly find specific filter values
- 📊 **Real-time Data Updates**: Instant filtering as you select options
- 🌙 **Dark Mode Support**: Fully responsive to system theme preferences
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- ⚡ **Performance Optimized**: Efficient filtering with React hooks
- 🎨 **Customizable Styling**: Built with Tailwind CSS
- 📝 **TypeScript Support**: Fully typed with generic interfaces
- ♿ **Accessible**: Proper ARIA labels and keyboard navigation

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/luciocabrera/react-table-with-facet-filters.git

# Navigate to the project directory
cd react-table-with-facet-filters

# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:5173` to see the application in action!

## 📖 Usage

### Basic Example

```tsx
import { FacetFilterTable, TableColumn } from "./components";

interface Employee {
  id: number;
  name: string;
  department: string;
  role: string;
  status: string;
}

const columns: TableColumn<Employee>[] = [
  { key: "name", label: "Name", filterable: true },
  { key: "department", label: "Department", filterable: true },
  { key: "role", label: "Role", filterable: true },
  { key: "status", label: "Status", filterable: true },
];

const data: Employee[] = [
  {
    id: 1,
    name: "John Doe",
    department: "Engineering",
    role: "Developer",
    status: "Active",
  },
  // ... more data
];

export default function MyTable() {
  return <FacetFilterTable data={data} columns={columns} />;
}
```

### Custom Cell Rendering

```tsx
const columns: TableColumn<Product>[] = [
  {
    key: "price",
    label: "Price",
    filterable: false,
    render: (value: number) => `$${value.toFixed(2)}`,
  },
  {
    key: "inStock",
    label: "Stock Status",
    filterable: true,
    render: (value: boolean) => (value ? "In Stock" : "Out of Stock"),
  },
];
```

## 🎯 Component API

### FacetFilterTable Props

| Prop      | Type               | Required | Description                      |
| --------- | ------------------ | -------- | -------------------------------- |
| `data`    | `T[]`              | ✅       | Array of data objects to display |
| `columns` | `TableColumn<T>[]` | ✅       | Column configuration array       |

### TableColumn Interface

| Property     | Type                                        | Required | Description                       |
| ------------ | ------------------------------------------- | -------- | --------------------------------- |
| `key`        | `keyof T`                                   | ✅       | Data object property key          |
| `label`      | `string`                                    | ✅       | Column header display text        |
| `filterable` | `boolean`                                   | ✅       | Whether column supports filtering |
| `render`     | `(value: any) => string \| React.ReactNode` | ❌       | Custom cell renderer              |

## 🎨 Filter Features

### Multi-Select Filtering

- Click the filter icon (�) in any filterable column header
- Select/deselect multiple values using checkboxes
- See immediate results as you make selections

### Search within Filters

- Use the search box within each filter popover
- Quickly find specific values in large filter lists
- Real-time filtering of available options

### Filter Management

- **Select All**: Quickly select all available filter options
- **Clear All**: Remove all selections for a specific filter
- **Global Clear**: Clear all filters across all columns
- **Filter Summary**: See active filter count and filtered record count

## 📱 Demo Pages

The repository includes two demo pages showcasing different use cases:

### 1. Employee Data Table (`/table`)

- **Data**: Employee records with departments, roles, and status
- **Features**: Filter by department, role, status, and location
- **Use Case**: HR management and employee directory

### 2. Product Categories (`/welcome/categories`)

- **Data**: Product catalog with categories, brands, and pricing
- **Features**: Filter by category, subcategory, brand, and stock status
- **Use Case**: E-commerce product management

## 🛠️ Technology Stack

- **React Router v7**: Modern file-based routing
- **TypeScript**: Type-safe development
- **Tailwind CSS v4**: Utility-first styling
- **Vite**: Fast build tooling
- **React 19**: Latest React features

## 🎨 Styling & Theming

The component is built with Tailwind CSS and supports:

- **Light/Dark Mode**: Automatic theme detection
- **Responsive Design**: Mobile-first approach
- **Custom Colors**: Easy to override with Tailwind utilities
- **Consistent Spacing**: Standardized padding and margins

### Dark Mode

```css
/* Automatic dark mode support */
.dark .table-component {
  background-color: rgb(31 41 55); /* gray-800 */
  color: rgb(243 244 246); /* gray-100 */
}
```

## 🔧 Development

### Project Structure

```
app/
├── components/
│   ├── FacetFilter.tsx          # Filter popover component
│   ├── FacetFilterTable.tsx     # Main table component
│   └── index.ts                 # Component exports
├── routes/
│   ├── table.tsx                # Employee data demo
│   └── welcome/
│       └── categories.tsx       # Product data demo
└── app.css                      # Global styles
```

### Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Type checking
npm run typecheck

# Start production server
npm run start
```

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t react-table-facet-filters .

# Run the container
docker run -p 3000:3000 react-table-facet-filters
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React Router](https://reactrouter.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Heroicons](https://heroicons.com/)

## 📞 Support

If you have any questions or need help:

- 🐛 [Report Issues](https://github.com/luciocabrera/react-table-with-facet-filters/issues)
- 💬 [Discussions](https://github.com/luciocabrera/react-table-with-facet-filters/discussions)

---

<div align="center">

**[View Repository](https://github.com/luciocabrera/react-table-with-facet-filters)** | **[Report Issues](https://github.com/luciocabrera/react-table-with-facet-filters/issues)** | **[Examples](https://github.com/luciocabrera/react-table-with-facet-filters/tree/main/app/routes)**

Made with ❤️ by [Lucio Cabrera](https://github.com/luciocabrera)

</div>
