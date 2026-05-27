import { AccountCreateModalContent } from "@/components/organisms/AccountCreateModal";
import type { AccountCreateModalInnerProps } from "@/components/organisms/AccountCreateModal";

export const modals = {
  accountCreate: AccountCreateModalContent,
} as const;

declare module "@mantine/modals" {
  export interface MantineModalsOverride {
    modals: typeof modals;
  }
}

export type ModalInnerProps = {
  accountCreate: AccountCreateModalInnerProps;
};
