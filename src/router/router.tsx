import { createHashRouter, Navigate } from "react-router-dom";
import { AppLayout } from "@/components/templates/AppLayout";
import { RequireOnboarding } from "./RequireOnboarding";
import { RedirectIfOnboarded } from "./RedirectIfOnboarded";
import { TransactionsPage } from "@/pages/Transactions";
import { AccountsPage } from "@/pages/Accounts";
import { CategoriesPage } from "@/pages/Categories";
import { TagsPage } from "@/pages/Tags";
import { CurrenciesPage } from "@/pages/Currencies";
import { DescriptionMappingsPage } from "@/pages/DescriptionMappings";

export const router = createHashRouter([
  {
    path: "/onboarding",
    element: <RedirectIfOnboarded />,
  },
  {
    element: <RequireOnboarding />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          { index: true, element: <Navigate to="/transactions" replace /> },
          { path: "transactions", element: <TransactionsPage /> },
          { path: "settings/accounts", element: <AccountsPage /> },
          { path: "settings/categories", element: <CategoriesPage /> },
          { path: "settings/tags", element: <TagsPage /> },
          { path: "settings/currencies", element: <CurrenciesPage /> },
          { path: "settings/description-mappings", element: <DescriptionMappingsPage /> },
        ],
      },
    ],
  },
]);
