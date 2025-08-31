import { CookieManager, AuthService, type AuthError } from "./auth";

/**
 * HTTP client with automatic authentication header injection
 */

export interface HttpClientConfig {
  baseUrl?: string;
  timeout?: number;
  defaultHeaders?: Record<string, string>;
}

export interface HttpResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export class AuthenticationError extends Error {
  constructor(
    public status: number,
    public type: AuthError["type"],
    message: string
  ) {
    super(message);
    this.name = "AuthenticationError";
  }
}

export class HttpClient {
  private config: Required<HttpClientConfig>;

  constructor(config: HttpClientConfig = {}) {
    this.config = {
      baseUrl: config.baseUrl || "",
      timeout: config.timeout || 10000,
      defaultHeaders: {
        "Content-Type": "application/json",
        ...config.defaultHeaders,
      },
    };
  }

  /**
   * Get authentication headers
   */
  private getAuthHeaders(): Record<string, string> {
    const token = CookieManager.getAccessToken();

    if (!token) {
      return {};
    }

    // Check if token is expired
    if (CookieManager.isTokenExpired()) {
      console.warn("Access token is expired");
      return {};
    }

    return {
      Authorization: `Bearer ${token}`,
    };
  }

  /**
   * Create request headers
   */
  private createHeaders(
    customHeaders: Record<string, string> = {}
  ): Record<string, string> {
    return {
      ...this.config.defaultHeaders,
      ...this.getAuthHeaders(),
      ...customHeaders,
    };
  }

  /**
   * Handle authentication errors
   */
  private async handleAuthError(response: Response): Promise<void> {
    if (response.status === 401) {
      // Try to refresh token
      const refreshed = await AuthService.refreshAccessToken();
      if (!refreshed) {
        // Refresh failed, user needs to login again
        throw new AuthenticationError(
          401,
          "TOKEN_EXPIRED",
          "Authentication required"
        );
      }
      // If refresh succeeded, the calling code can retry the request
      return;
    }

    if (response.status === 403) {
      throw new AuthenticationError(403, "FORBIDDEN", "Access denied");
    }
  }

  /**
   * Make HTTP request with automatic authentication
   */
  private async request<T = any>(
    url: string,
    options: RequestInit = {},
    retryCount = 0
  ): Promise<HttpResponse<T>> {
    const fullUrl = this.config.baseUrl + url;
    const headers = this.createHeaders(
      options.headers as Record<string, string>
    );

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(fullUrl, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Handle authentication errors
      if (response.status === 401 && retryCount === 0) {
        await this.handleAuthError(response);
        // Retry the request once with refreshed token
        return this.request<T>(url, options, retryCount + 1);
      }

      if (response.status === 403) {
        await this.handleAuthError(response);
      }

      // Parse response
      let data: T;
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = (await response.text()) as T;
      }

      // Convert headers to plain object
      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      };
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof AuthenticationError) {
        throw error;
      }

      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("Request timeout");
      }

      throw error;
    }
  }

  /**
   * GET request
   */
  async get<T = any>(
    url: string,
    params?: Record<string, string | number | boolean>,
    options: Omit<RequestInit, "method" | "body"> = {}
  ): Promise<HttpResponse<T>> {
    let fullUrl = url;

    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        searchParams.append(key, String(value));
      });
      fullUrl += `?${searchParams.toString()}`;
    }

    return this.request<T>(fullUrl, {
      ...options,
      method: "GET",
    });
  }

  /**
   * POST request
   */
  async post<T = any>(
    url: string,
    body?: any,
    options: Omit<RequestInit, "method" | "body"> = {}
  ): Promise<HttpResponse<T>> {
    return this.request<T>(url, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * PUT request
   */
  async put<T = any>(
    url: string,
    body?: any,
    options: Omit<RequestInit, "method" | "body"> = {}
  ): Promise<HttpResponse<T>> {
    return this.request<T>(url, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * DELETE request
   */
  async delete<T = any>(
    url: string,
    options: Omit<RequestInit, "method" | "body"> = {}
  ): Promise<HttpResponse<T>> {
    return this.request<T>(url, {
      ...options,
      method: "DELETE",
    });
  }

  /**
   * PATCH request
   */
  async patch<T = any>(
    url: string,
    body?: any,
    options: Omit<RequestInit, "method" | "body"> = {}
  ): Promise<HttpResponse<T>> {
    return this.request<T>(url, {
      ...options,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  }
}

// Create default HTTP client instance
export const httpClient = new HttpClient({
  baseUrl:
    process.env.NODE_ENV === "development" ? "http://localhost:3001" : "/api",
  timeout: 15000,
});

// Export convenience methods
export const api = {
  get: httpClient.get.bind(httpClient),
  post: httpClient.post.bind(httpClient),
  put: httpClient.put.bind(httpClient),
  delete: httpClient.delete.bind(httpClient),
  patch: httpClient.patch.bind(httpClient),
};
