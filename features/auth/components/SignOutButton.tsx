"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { authClient } from "@/features/auth/data/auth-client";

type SignOutButtonProps = {
  className?: string;
};

export const SignOutButton = ({ className }: SignOutButtonProps) => {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

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
      <button className={className} type="button" onClick={handleSignOut} disabled={pending}>
        {pending ? "Leaving..." : "Sign out"}
      </button>
      {message ? (
        <span role="status" aria-live="polite">
          {message}
        </span>
      ) : null}
    </>
  );
};
