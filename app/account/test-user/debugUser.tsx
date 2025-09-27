// account/test-user/page.tsx
"use client";

import { useAppStore } from "@/app/store/useApp";

export default function TestUserPage() {
  const { user, token } = useAppStore();

  return (
    <div>
      <h1>Fetched User Data</h1>
      <div>
        <h2>Token</h2>
        {token ? (
          <p>✅ Token: {token.substring(0, 20)}...</p>
        ) : (
          <p>❌ No token found</p>
        )}
      </div>
      <div>
        <h2>User</h2>
        {user ? (
          <pre>{JSON.stringify(user, null, 2)}</pre>
        ) : (
          <p>❌ No user data</p>
        )}
      </div>
    </div>
  );
}