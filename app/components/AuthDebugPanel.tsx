import { useState, useEffect } from "react";
import { employeeApi } from "../services/employeeApi";

export function AuthDebugPanel() {
  const [authStatus, setAuthStatus] = useState(employeeApi.getAuthStatus());
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    // Update auth status every second
    const interval = setInterval(() => {
      setAuthStatus(employeeApi.getAuthStatus());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCreateToken = async () => {
    setIsLoading(true);
    setMessage("");

    try {
      await employeeApi.createDemoToken();
      setMessage("✅ Demo token created successfully!");
      setAuthStatus(employeeApi.getAuthStatus());
    } catch (error) {
      setMessage(
        `❌ Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    setMessage("");

    try {
      await employeeApi.logout();
      setMessage("✅ Logged out successfully!");
      setAuthStatus(employeeApi.getAuthStatus());
    } catch (error) {
      setMessage(
        `❌ Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (ms: number | null) => {
    if (!ms) return "N/A";
    if (ms < 0) return "Expired";

    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const formatDate = (timestamp: number | null) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          🔐 Authentication Debug Panel
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={handleCreateToken}
            disabled={isLoading}
            className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-md transition-colors"
          >
            {isLoading ? "⏳" : "🔑"} Create Demo Token
          </button>
          <button
            onClick={handleLogout}
            disabled={isLoading || !authStatus.isAuthenticated}
            className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-md transition-colors"
          >
            {isLoading ? "⏳" : "🚪"} Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 dark:text-gray-400">Status:</span>
            <span
              className={`flex items-center space-x-1 ${
                authStatus.isAuthenticated ?
                  "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
              }`}
            >
              <span>{authStatus.isAuthenticated ? "🟢" : "🔴"}</span>
              <span>
                {authStatus.isAuthenticated ?
                  "Authenticated"
                : "Not Authenticated"}
              </span>
            </span>
          </div>

          <div className="flex items-start space-x-2">
            <span className="text-gray-600 dark:text-gray-400 mt-0.5">
              Token:
            </span>
            <span className="text-gray-900 dark:text-gray-100 font-mono text-xs break-all">
              {authStatus.token ?
                `${authStatus.token.substring(0, 20)}...`
              : "None"}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 dark:text-gray-400">Expires:</span>
            <span className="text-gray-900 dark:text-gray-100">
              {formatDate(authStatus.expiresAt)}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-gray-600 dark:text-gray-400">Time left:</span>
            <span
              className={`${
                (
                  authStatus.timeUntilExpiry &&
                  authStatus.timeUntilExpiry < 300000
                ) ?
                  "text-orange-600 dark:text-orange-400"
                : "text-gray-900 dark:text-gray-100"
              }`}
            >
              {formatTime(authStatus.timeUntilExpiry)}
            </span>
          </div>
        </div>
      </div>

      {message && (
        <div className="mt-3 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-800 dark:text-gray-200">
          {message}
        </div>
      )}

      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-xs">
        <div className="flex items-start space-x-2">
          <span className="text-blue-500">ℹ️</span>
          <div className="text-blue-800 dark:text-blue-200">
            <div className="font-semibold mb-1">How it works:</div>
            <ul className="space-y-1 text-blue-700 dark:text-blue-300">
              <li>• Click "Create Demo Token" to simulate login</li>
              <li>
                • API requests now include Authorization header with Bearer
                token
              </li>
              <li>
                • Token expires after 1 hour and auto-refreshes when needed
              </li>
              <li>• Try accessing data - authentication is now required!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
