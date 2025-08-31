/**
 * Server-side authentication utilities for React Router loaders
 * Works with externally managed cookies (e.g., Lambda functions)
 */

/**
 * Extract access token from request cookies
 * Use this in React Router loaders to get the auth token
 */
export function getAccessTokenFromRequest(request: Request): string | null {
  const cookieHeader = request.headers.get("Cookie");
  if (!cookieHeader) {
    return null;
  }

  const cookies = parseCookieHeader(cookieHeader);

  // Try common cookie names for access tokens
  return (
    cookies.access_token ||
    cookies.accessToken ||
    cookies.auth_token ||
    cookies.token ||
    null
  );
}

/**
 * Extract user info from request cookies (if available)
 */
export function getUserFromRequest(
  request: Request
): { id?: string; email?: string } | null {
  const cookieHeader = request.headers.get("Cookie");
  if (!cookieHeader) {
    return null;
  }

  const cookies = parseCookieHeader(cookieHeader);

  return {
    id: cookies.user_id || cookies.userId || undefined,
    email: cookies.user_email || cookies.userEmail || undefined,
  };
}

/**
 * Check if request has valid authentication
 */
export function isRequestAuthenticated(request: Request): boolean {
  const token = getAccessTokenFromRequest(request);
  return token !== null && token.length > 0;
}

/**
 * Create authorization header from request
 * Returns the header value to use in API calls
 */
export function createAuthHeaderFromRequest(request: Request): string | null {
  const token = getAccessTokenFromRequest(request);
  if (!token) {
    return null;
  }

  return `Bearer ${token}`;
}

/**
 * Utility to parse cookie header string into key-value pairs
 */
function parseCookieHeader(cookieHeader: string): Record<string, string> {
  return cookieHeader.split(";").reduce(
    (cookies, cookie) => {
      const [name, ...rest] = cookie.trim().split("=");
      const value = rest.join("=");
      if (name && value) {
        cookies[name] = decodeURIComponent(value);
      }
      return cookies;
    },
    {} as Record<string, string>
  );
}

/**
 * Auth error for when authentication is required but missing
 */
export class ServerAuthError extends Error {
  public readonly status: number;
  public readonly type: string;

  constructor(
    message: string = "Authentication required",
    status: number = 401
  ) {
    super(message);
    this.name = "ServerAuthError";
    this.status = status;
    this.type = "AUTHENTICATION_REQUIRED";
  }
}

/**
 * Require authentication in a loader - throws if not authenticated
 */
export function requireAuth(request: Request): string {
  const token = getAccessTokenFromRequest(request);

  if (!token) {
    throw new ServerAuthError("Access token is required. Please login.");
  }

  return token;
}

/**
 * Optional authentication in a loader - returns token if available
 */
export function optionalAuth(request: Request): string | null {
  return getAccessTokenFromRequest(request);
}
