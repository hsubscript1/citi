import { create } from "zustand";
import { User } from "@/app/account/dashboard/components/type";

interface AppState {
  user: User | null;
  token: string | null;
  currentView: string;
  setCurrentView: (view: string) => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  loginUser: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logoutUser: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  token: null,
  currentView: "home",

  // 🔹 Actions
  setCurrentView: (view) => set({ currentView: view }),
  setUser: (user) => set({ user }),
  setToken: (token) => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
    set({ token });
  },

  // In your store (useAppStore)
loginUser: async (email, password) => {
  try {
    // 🔹 Use the correct API endpoint
    const res = await fetch("/api/login-api", { // Changed from "/api/login"
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || "Login failed" };
    }

    const token = data.token;
    
    // 🔹 Update both token state and localStorage
    set({ token });
    localStorage.setItem("token", token);

    // 🔹 Fetch user profile
    const profileRes = await fetch("/api/fetcher-api", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const profileData = await profileRes.json();
    if (profileRes.ok && profileData.user) {
      set({ user: profileData.user });
      return { success: true };
    } else {
      return { success: false, error: profileData.error || "Profile fetch failed" };
    }
  } catch (err) {
    return { success: false, error: "Login failed" };
  }
},

  logoutUser: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
