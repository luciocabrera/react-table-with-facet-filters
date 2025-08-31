import { Outlet, NavLink } from "react-router";
import type { Route } from "./+types/welcome";
import logoDark from "../welcome/logo-dark.svg";
import logoLight from "../welcome/logo-light.svg";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Welcome - Data Filters" },
    { name: "description", content: "Explore and configure data filters" },
  ];
}

const navigationItems = [
  { to: "/welcome", label: "Overview", end: true },
  { to: "/welcome/categories", label: "Categories" },
  { to: "/welcome/price-range", label: "Price Range" },
  { to: "/welcome/date-range", label: "Date Range" },
  { to: "/welcome/status", label: "Status" },
  { to: "/table", label: "Data Table" },
];

export default function Welcome() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Header with Logo */}
      <header className="flex flex-col items-center gap-9 pt-16 pb-8">
        <div className="w-[500px] max-w-[100vw] p-4">
          <img
            src={logoLight}
            alt="React Router"
            className="block w-full dark:hidden"
          />
          <img
            src={logoDark}
            alt="React Router"
            className="hidden w-full dark:block"
          />
        </div>
      </header>

      {/* Navigation */}
      <nav className="flex justify-center px-4 pb-8">
        <div className="max-w-4xl w-full">
          <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-2 bg-white dark:bg-gray-800">
            <div className="flex flex-wrap gap-2 justify-center">
              {navigationItems.map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive ?
                        "bg-blue-600 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <div className="flex-1 flex justify-center px-4 pb-8">
        <div className="max-w-4xl w-full">
          <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-8 bg-white dark:bg-gray-800">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
}
