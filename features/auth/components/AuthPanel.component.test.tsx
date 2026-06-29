import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { resetMockRouter, router } from "@/tests/component/router";

const authClientMock = vi.hoisted(() => ({
  signInEmail: vi.fn(),
  signInSocial: vi.fn(),
  signUpEmail: vi.fn(),
}));

vi.mock("@/features/auth/data/auth-client", () => ({
  authClient: {
    signIn: {
      email: authClientMock.signInEmail,
      social: authClientMock.signInSocial,
    },
    signUp: {
      email: authClientMock.signUpEmail,
    },
  },
}));

import { AuthPanel } from "@/features/auth/components/AuthPanel";

describe("AuthPanel", () => {
  beforeEach(() => {
    resetMockRouter();
    authClientMock.signInEmail.mockReset();
    authClientMock.signInSocial.mockReset();
    authClientMock.signUpEmail.mockReset();
  });

  it("submits sign-in credentials and redirects on success", async () => {
    const user = userEvent.setup();
    authClientMock.signInEmail.mockResolvedValue({ error: null });

    render(<AuthPanel googleEnabled={false} mode="sign-in" />);

    await user.type(screen.getByLabelText("Email"), "user@example.test");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.click(screen.getByRole("button", { name: "Enter" }));

    await waitFor(() => {
      expect(authClientMock.signInEmail).toHaveBeenCalledWith({
        email: "user@example.test",
        password: "password123",
        callbackURL: "/account",
      });
    });
    expect(router.push).toHaveBeenCalledWith("/account");
    expect(router.refresh).toHaveBeenCalled();
    expect(screen.getByRole("link", { name: "Create account" })).toHaveAttribute(
      "href",
      "/register",
    );
  });

  it("renders sign-up fields and submits account data", async () => {
    const user = userEvent.setup();
    authClientMock.signUpEmail.mockResolvedValue({ error: null });

    render(<AuthPanel googleEnabled={false} mode="sign-up" />);

    await user.type(screen.getByLabelText("Name"), "Daryna");
    await user.type(screen.getByLabelText("Email"), "daryna@example.test");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.click(screen.getByRole("button", { name: "Create" }));

    await waitFor(() => {
      expect(authClientMock.signUpEmail).toHaveBeenCalledWith({
        name: "Daryna",
        email: "daryna@example.test",
        password: "password123",
        callbackURL: "/account",
      });
    });
    expect(screen.getByRole("link", { name: "I have account" })).toHaveAttribute(
      "href",
      "/login",
    );
  });

  it("shows auth errors from the client", async () => {
    const user = userEvent.setup();
    authClientMock.signInEmail.mockResolvedValue({
      error: { message: "Invalid credentials" },
    });

    render(<AuthPanel googleEnabled={false} mode="sign-in" />);

    await user.type(screen.getByLabelText("Email"), "user@example.test");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.click(screen.getByRole("button", { name: "Enter" }));

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(
        "Invalid credentials",
      );
    });
    expect(router.push).not.toHaveBeenCalled();
  });
});
