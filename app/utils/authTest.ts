/**
 * Test authentication integration with mock scenarios
 */

import { employeeApi } from "../services/employeeApi";

async function testAuthenticationFlow() {
  console.log("🧪 Starting Authentication Test Suite\n");

  // Test 1: Check initial unauthenticated state
  console.log("1️⃣ Testing initial state (should be unauthenticated)");
  const initialStatus = employeeApi.getAuthStatus();
  console.log("   Initial auth status:", initialStatus);
  console.assert(
    !initialStatus.isAuthenticated,
    "Should start unauthenticated"
  );

  // Test 2: Try accessing data without authentication (should work with mock mode)
  console.log("\n2️⃣ Testing API access without authentication");
  try {
    const stats = await employeeApi.getDepartmentStats();
    console.log(
      "   ✅ Department stats loaded (mock mode):",
      Object.keys(stats).length,
      "departments"
    );
  } catch (error) {
    console.log("   ❌ Error accessing department stats:", error);
  }

  // Test 3: Create a demo token
  console.log("\n3️⃣ Creating demo token");
  try {
    await employeeApi.createDemoToken();
    const authStatus = employeeApi.getAuthStatus();
    console.log("   ✅ Demo token created successfully");
    console.log("   Auth status:", authStatus);
    console.assert(
      authStatus.isAuthenticated,
      "Should be authenticated after token creation"
    );
  } catch (error) {
    console.log("   ❌ Error creating demo token:", error);
  }

  // Test 4: Access data with authentication
  console.log("\n4️⃣ Testing API access with authentication");
  try {
    const engineeringEmployees =
      await employeeApi.getEmployeesByDepartment("Engineering");
    console.log(
      "   ✅ Engineering employees loaded:",
      engineeringEmployees.total,
      "employees"
    );
  } catch (error) {
    console.log("   ❌ Error accessing employee data:", error);
  }

  // Test 5: Verify token expiration handling
  console.log("\n5️⃣ Testing token expiration (simulated)");
  const currentStatus = employeeApi.getAuthStatus();
  if (currentStatus.timeUntilExpiry) {
    const hoursLeft = Math.floor(
      currentStatus.timeUntilExpiry / (1000 * 60 * 60)
    );
    const minutesLeft = Math.floor(
      (currentStatus.timeUntilExpiry % (1000 * 60 * 60)) / (1000 * 60)
    );
    console.log(`   Token expires in: ${hoursLeft}h ${minutesLeft}m`);
  }

  // Test 6: Test logout
  console.log("\n6️⃣ Testing logout");
  try {
    await employeeApi.logout();
    const logoutStatus = employeeApi.getAuthStatus();
    console.log("   ✅ Logout successful");
    console.log("   Post-logout status:", logoutStatus);
    console.assert(
      !logoutStatus.isAuthenticated,
      "Should be unauthenticated after logout"
    );
  } catch (error) {
    console.log("   ❌ Error during logout:", error);
  }

  // Test 7: Try accessing data after logout (should still work with mock mode)
  console.log("\n7️⃣ Testing API access after logout");
  try {
    const stats = await employeeApi.getDepartmentStats();
    console.log("   ✅ Department stats still accessible (mock mode)");
  } catch (error) {
    console.log("   ❌ Error accessing data after logout:", error);
  }

  console.log("\n🏁 Authentication test suite completed!");
}

// Export for use in browser console
if (typeof window !== "undefined") {
  (window as any).testAuthenticationFlow = testAuthenticationFlow;
  console.log(
    "💡 Run testAuthenticationFlow() in browser console to test authentication"
  );
}
