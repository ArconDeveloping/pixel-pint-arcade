import { vi } from "vitest";

import type { ActionState } from "@/lib/action-state";

type MockActionStateTuple = [
  ActionState,
  (formData?: FormData) => void,
  boolean,
];

export const actionStateMock = {
  defaultAction: vi.fn(),
  queue: [] as MockActionStateTuple[],
};

export const queueActionState = (
  state: ActionState,
  options?: {
    action?: (formData?: FormData) => void;
    pending?: boolean;
  },
) => {
  actionStateMock.queue.push([
    state,
    options?.action ?? actionStateMock.defaultAction,
    options?.pending ?? false,
  ]);
};

export const resetActionStateMock = () => {
  actionStateMock.defaultAction.mockReset();
  actionStateMock.queue = [];
};
