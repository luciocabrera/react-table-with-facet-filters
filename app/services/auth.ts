/**
 * Authentication utilities for handling access tokens and cookies
 */

export interface AuthToken {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
  tokenType: "Bearer";
}

export interface AuthError {
  type: "UNAUTHORIZED" | "FORBIDDEN" | "TOKEN_EXPIRED" | "TOKEN_INVALID";
  message: string;
  status: number;
}

/**
 * Cookie management utilities
 */
export class CookieManager {
  private static readonly ACCESS_TOKEN_KEY = "access_token";
  private static readonly REFRESH_TOKEN_KEY = "refresh_token";
  private static readonly TOKEN_EXPIRY_KEY = "token_expires_at";

  /**
   * Get access token from cookie
   */
  static getAccessToken(): string | null {
    if (typeof document === "undefined") {
      // Server-side rendering - no cookies available
      return null;
    }

    const cookies = document.cookie.split(";").reduce(
      (acc, cookie) => {
        const [key, value] = cookie.trim().split("=");
        acc[key] = decodeURIComponent(value);
        return acc;
      },
      {} as Record<string, string>
    );

    return cookies[this.ACCESS_TOKEN_KEY] || null;
  }

  /**
   * Get refresh token from cookie
   */
  static getRefreshToken(): string | null {
    if (typeof document === "undefined") {
      return null;
    }

    const cookies = document.cookie.split(";").reduce(
      (acc, cookie) => {
        const [key, value] = cookie.trim().split("=");
        acc[key] = decodeURIComponent(value);
        return acc;
      },
      {} as Record<string, string>
    );

    return cookies[this.REFRESH_TOKEN_KEY] || null;
  }

  /**
   * Get token expiry time from cookie
   */
  static getTokenExpiry(): number | null {
    if (typeof document === "undefined") {
      return null;
    }

    const cookies = document.cookie.split(";").reduce(
      (acc, cookie) => {
        const [key, value] = cookie.trim().split("=");
        acc[key] = decodeURIComponent(value);
        return acc;
      },
      {} as Record<string, string>
    );

    const expiry = cookies[this.TOKEN_EXPIRY_KEY];
    return expiry ? parseInt(expiry, 10) : null;
  }

  /**
   * Set access token in cookie
   */
  static setAccessToken(token: string, expiresInSeconds: number = 3600): void {
    if (typeof document === "undefined") {
      return;
    }

    const expiresAt = Date.now() + expiresInSeconds * 1000;
    const expires = new Date(expiresAt).toUTCString();

    document.cookie = `${this.ACCESS_TOKEN_KEY}=${encodeURIComponent(token)}; expires=${expires}; path=/; secure; samesite=strict`;
    document.cookie = `${this.TOKEN_EXPIRY_KEY}=${expiresAt}; expires=${expires}; path=/; secure; samesite=strict`;
  }

  /**
   * Set refresh token in cookie
   */
  static setRefreshToken(
    token: string,
    expiresInSeconds: number = 86400 * 7
  ): void {
    if (typeof document === "undefined") {
      return;
    }

    const expires = new Date(
      Date.now() + expiresInSeconds * 1000
    ).toUTCString();
    document.cookie = `${this.REFRESH_TOKEN_KEY}=${encodeURIComponent(token)}; expires=${expires}; path=/; secure; samesite=strict; httponly`;
  }

  /**
   * Clear all auth cookies
   */
  static clearAuthCookies(): void {
    if (typeof document === "undefined") {
      return;
    }

    document.cookie = `${this.ACCESS_TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `${this.REFRESH_TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `${this.TOKEN_EXPIRY_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  /**
   * Check if current token is expired
   */
  static isTokenExpired(): boolean {
    const expiry = this.getTokenExpiry();
    if (!expiry) return true;

    // Add 5 minute buffer to prevent race conditions
    return Date.now() >= expiry - 300000;
  }

  /**
   * Get current auth token info
   */
  static getAuthToken(): AuthToken | null {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();
    const expiresAt = this.getTokenExpiry();

    if (!accessToken || !expiresAt) {
      return null;
    }

    return {
      accessToken,
      refreshToken: refreshToken || undefined,
      expiresAt,
      tokenType: "Bearer",
    };
  }
}

/**
 * Authentication service for handling login/logout
 */
export class AuthService {
  /**
   * Mock login for development
   */
  static async mockLogin(email: string, password: string): Promise<AuthToken> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock validation
    if (email === "admin@company.com" && password === "password") {
      const token: AuthToken = {
        accessToken: "mock_access_token_" + Date.now(),
        refreshToken: "mock_refresh_token_" + Date.now(),
        expiresAt: Date.now() + 3600 * 1000, // 1 hour
        tokenType: "Bearer",
      };

      // Store in cookies
      CookieManager.setAccessToken(token.accessToken, 3600);
      if (token.refreshToken) {
        CookieManager.setRefreshToken(token.refreshToken);
      }

      return token;
    }

    throw new Error("Invalid credentials");
  }

  /**
   * Logout and clear cookies
   */
  static async logout(): Promise<void> {
    CookieManager.clearAuthCookies();

    // In a real app, you might call an API endpoint to invalidate the token
    // await fetch('/api/auth/logout', { method: 'POST' });
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    const token = CookieManager.getAuthToken();
    return token !== null && !CookieManager.isTokenExpired();
  }

  /**
   * Refresh access token using refresh token
   */
  static async refreshAccessToken(): Promise<AuthToken | null> {
    const refreshToken = CookieManager.getRefreshToken();
    if (!refreshToken) {
      return null;
    }

    try {
      // Mock refresh token logic
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newToken: AuthToken = {
        accessToken: "refreshed_access_token_" + Date.now(),
        refreshToken: refreshToken, // Keep same refresh token
        expiresAt: Date.now() + 3600 * 1000, // 1 hour
        tokenType: "Bearer",
      };

      CookieManager.setAccessToken(newToken.accessToken, 3600);
      return newToken;
    } catch (error) {
      // Refresh failed, clear all tokens
      CookieManager.clearAuthCookies();
      return null;
    }
  }
}
