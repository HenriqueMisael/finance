import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  userName: string;
  onboardingComplete: boolean;
  setUserName: (name: string) => void;
  completeOnboarding: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      userName: "",
      onboardingComplete: false,
      setUserName: (name) => set({ userName: name }),
      completeOnboarding: () => set({ onboardingComplete: true }),
    }),
    { name: "finance-settings" }
  )
);
