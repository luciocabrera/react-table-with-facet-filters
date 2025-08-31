/**
 * Example demonstrating how to use server-side authentication
 * with externally managed cookies in React Router loaders
 */

import { useLoaderData } from "react-router";
import {
  getAccessTokenFromRequest,
  getUserFromRequest,
  isRequestAuthenticated,
  requireAuth,
  optionalAuth,
} from "../services/serverAuth";

export function meta() {
  return [
    { title: "Server-Side Authentication Demo" },
    {
      name: "description",
      content: "How to extract tokens from cookies in loaders",
    },
  ];
}

export async function loader({ request }: { request: Request }) {
  // Example 1: Optional authentication - get token if available
  const optionalToken = optionalAuth(request);

  // Example 2: Check if request is authenticated
  const isAuth = isRequestAuthenticated(request);

  // Example 3: Extract user info from cookies (if your Lambda sets user cookies)
  const user = getUserFromRequest(request);

  // Example 4: Get specific token (customize cookie names as needed)
  const accessToken = getAccessTokenFromRequest(request);

  // Example 5: Require authentication - will throw if not authenticated
  // const requiredToken = requireAuth(request); // Uncomment to test

  // Example 6: Make authenticated API calls
  let protectedData = null;
  if (accessToken) {
    try {
      // In real app, make API calls with Authorization header:
      // const response = await fetch('https://your-api.com/protected', {
      //   headers: {
      //     'Authorization': `Bearer ${accessToken}`,
      //     'Content-Type': 'application/json',
      //   }
      // });
      // protectedData = await response.json();

      protectedData = {
        message: "This is protected data accessible with token!",
      };
    } catch (error) {
      console.error("Error fetching protected data:", error);
    }
  }

  return {
    isAuthenticated: isAuth,
    accessToken: accessToken ? `${accessToken.substring(0, 20)}...` : null, // Truncated for security
    user,
    protectedData,
    timestamp: new Date().toISOString(),
  };
}

export default function AuthDemo() {
  const { isAuthenticated, accessToken, user, protectedData, timestamp } =
    useLoaderData<typeof loader>();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        🔐 Server-Side Authentication Demo
      </h1>

      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Authentication Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">
                Authenticated:
              </span>
              <span
                className={`ml-2 ${isAuthenticated ? "text-green-600" : "text-red-600"}`}
              >
                {isAuthenticated ? "✅ Yes" : "❌ No"}
              </span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">
                Access Token:
              </span>
              <span className="ml-2 text-gray-900 dark:text-gray-100 font-mono">
                {accessToken || "None"}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            User Information
          </h2>
          <div className="text-sm space-y-2">
            <div>
              <span className="text-gray-600 dark:text-gray-400">User ID:</span>
              <span className="ml-2 text-gray-900 dark:text-gray-100">
                {user?.id || "Not available"}
              </span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Email:</span>
              <span className="ml-2 text-gray-900 dark:text-gray-100">
                {user?.email || "Not available"}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Protected Data
          </h2>
          {protectedData ?
            <div className="text-sm text-green-700 dark:text-green-300">
              <pre className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                {JSON.stringify(protectedData, null, 2)}
              </pre>
            </div>
          : <div className="text-sm text-gray-600 dark:text-gray-400">
              No protected data available - authentication required
            </div>
          }
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
            💡 How This Works
          </h2>
          <div className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
            <p>
              <strong>1. Lambda Function:</strong> Your Lambda function handles
              authentication and sets cookies with access tokens.
            </p>
            <p>
              <strong>2. React Router Loader:</strong> The loader extracts
              tokens from request cookies server-side.
            </p>
            <p>
              <strong>3. API Calls:</strong> Use the extracted token to make
              authenticated API requests.
            </p>
            <p>
              <strong>4. Cookie Names:</strong> Customize cookie names in
              serverAuth.ts to match your Lambda setup.
            </p>
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Last updated: {timestamp}
          </div>
        </div>
      </div>
    </div>
  );
}
