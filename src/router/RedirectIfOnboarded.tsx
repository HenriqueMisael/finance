import { Navigate } from "react-router-dom";
import { useSettingsStore } from "@/stores/settings";
import { Onboarding } from "@/components/organisms/onboarding/Onboarding";

export function RedirectIfOnboarded() {
  const { onboardingComplete } = useSettingsStore();

  if (onboardingComplete) {
    return <Navigate to="/transactions" replace />;
  }

  return <Onboarding />;
}
