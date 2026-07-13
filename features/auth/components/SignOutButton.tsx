"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { authClient } from "@/features/auth/data/auth-client";
import styles from "./SignOutButton.module.css";

type SignOutButtonProps = {
  className?: string;
};

export const SignOutButton = ({ className }: SignOutButtonProps) => {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const buttonLabel = pending ? "Leaving..." : "Sign out";

  const handleSignOut = async () => {
    setMessage("");
    setPending(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        setMessage(result.error.message ?? "Could not sign out.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setMessage("Could not sign out. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <button
        aria-label={buttonLabel}
        className={[className, styles.root].filter(Boolean).join(" ")}
        disabled={pending}
        title={buttonLabel}
        type="button"
        onClick={handleSignOut}
      >
        <span className={styles.label}>{buttonLabel}</span>
        <svg
          aria-hidden="true"
          className={styles.icon}
          viewBox="0 0 24 24"
        >
          <path d="M9 4H5v16h4" />
          <path d="M14 8l4 4-4 4" />
          <path d="M18 12H8" />
        </svg>
      </button>
      {message ? (
        <span role="status" aria-live="polite">
          {message}
        </span>
      ) : null}
    </>
  );
};
