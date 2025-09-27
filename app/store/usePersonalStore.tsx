import { create } from "zustand";

interface SignupData {
  fname: string;
  lname: string;
  email: string;
  password: string;
}

interface PersonalStore {
  birthday: string;
  gender: string;
  pinValue: string[];
  signupData: SignupData | null;
  setBirthday: (val: string) => void;
  setGender: (val: string) => void;
  addPinDigit: (num: number) => void;
  clearPin: () => void;
  backspacePin: () => void;
  setSignupData: (data: SignupData) => void;
}

export const usePersonalStore = create<PersonalStore>((set) => ({
  birthday: "",
  gender: "",
  pinValue: [],
  signupData: null,
  setBirthday: (val) => set({ birthday: val }),
  setGender: (val) => set({ gender: val }),
  addPinDigit: (num) =>
    set((state) =>
      state.pinValue.length < 4
        ? { pinValue: [...state.pinValue, String(num)] }
        : state
    ),
  clearPin: () => set({ pinValue: [] }),
  backspacePin: () =>
    set((state) => ({ pinValue: state.pinValue.slice(0, -1) })),
  setSignupData: (data) => set({ signupData: data }),
}));
