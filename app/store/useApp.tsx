import { create } from "zustand";
import { AppState } from ".";


export const useAppStore = create<AppState>((set) => ({
  user: null,
  token: null,
  currentView: "home",

  setCurrentView: (view) => set({ currentView: view }),
  setUser: (user) => set({ user }),
  setToken: (token) => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
    set({ token });
  },

loginUser: async (email, password) => {
  try {
    const res = await fetch("/api/login-api", { 
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
    
    set({ token });
    localStorage.setItem("token", token);

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
