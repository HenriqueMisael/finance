import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { RouterProvider } from "react-router-dom";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { router } from "./router/router";
import { Splash } from "./components/templates/Splash";
import { modals } from "./modals";

function AppRoot() {
  const [splashDone, setSplashDone] = useState(false);

  if (!splashDone) {
    return <Splash onFinished={() => setSplashDone(true)} />;
  }

  return <RouterProvider router={router} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="auto">
      <ModalsProvider modals={modals}>
        <AppRoot />
      </ModalsProvider>
    </MantineProvider>
  </StrictMode>
);
