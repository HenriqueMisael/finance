import { Navigate, Outlet } from "react-router-dom";
import { useSettingsStore } from "@/stores/settings";

export function RequireOnboarding() {
  const { onboardingComplete } = useSettingsStore();

  if (!onboardingComplete) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
}
