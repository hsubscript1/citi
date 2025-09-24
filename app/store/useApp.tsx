// app/store/useApp.ts
import { create } from "zustand";
import { User } from "@/app/account/dashboard/components/type";

interface AppState {
  user: User;
  currentView: string;
  setCurrentView: (view: string) => void;
  setUser: (user: User) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    profilePicture: "",
  },
  currentView: "home",
  setCurrentView: (view: string) => set({ currentView: view }),
  setUser: (user: User) => set({ user }),
}));
