interface SuspenseControlsProps {
  department?: string;
}

export function SuspenseControls({ department }: SuspenseControlsProps) {
  const handleRefreshData = () => {
    // Force a re-render by reloading the page
    // In a real app, you might use router.refresh() or revalidation
    window.location.reload();
  };

  if (!department) {
    return null;
  }

  return (
    <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="text-sm text-blue-800 dark:text-blue-200">
          <div className="font-semibold mb-1">🔄 Suspense Demo Controls</div>
          <div>
            Data for <span className="font-mono">{department}</span> loads via
            server promise + React use hook.
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleRefreshData}
            className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
}
