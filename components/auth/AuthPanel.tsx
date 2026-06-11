"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { authClient } from "@/lib/auth-client";
import styles from "./AuthPanel.module.css";

type AuthPanelProps = {
  mode: "sign-in" | "sign-up";
  googleEnabled: boolean;
};

const authSuccessPath = "/account";

export const AuthPanel = ({ mode, googleEnabled }: AuthPanelProps) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const isSignUp = mode === "sign-up";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setPending(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const name = String(formData.get("name") ?? "");

    const result = isSignUp
      ? await authClient.signUp.email({
          name,
          email,
          password,
          callbackURL: authSuccessPath,
        })
      : await authClient.signIn.email({
          email,
          password,
          callbackURL: authSuccessPath,
        });

    setPending(false);

    if (result.error) {
      setMessage(result.error.message ?? "Authentication failed.");
      return;
    }

    router.push(authSuccessPath);
    router.refresh();
  };

  const handleGoogle = async () => {
    setMessage("");
    setPending(true);

    const result = await authClient.signIn.social({
      provider: "google",
      callbackURL: authSuccessPath,
    });

    setPending(false);

    if (result.error) {
      setMessage(result.error.message ?? "Google sign in failed.");
    }
  };

  return (
    <main className={styles.shell}>
      <section className={styles.panel}>
        <h1>{isSignUp ? "Create account" : "Sign in"}</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          {isSignUp ? (
            <div className={styles.field}>
              <label htmlFor="name">Name</label>
              <input id="name" name="name" autoComplete="name" required minLength={2} />
            </div>
          ) : null}
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={isSignUp ? "new-password" : "current-password"}
              required
              minLength={8}
            />
          </div>
          <div className={styles.actions}>
            <button className={`btn ${styles.submit}`} type="submit" disabled={pending}>
              {isSignUp ? "Create" : "Enter"}
            </button>
            {googleEnabled ? (
              <button
                className={styles.googleButton}
                type="button"
                onClick={handleGoogle}
                disabled={pending}
              >
                Google
              </button>
            ) : null}
          </div>
          <div className={styles.message} role="status" aria-live="polite">
            {message}
          </div>
        </form>
        <Link
          className={styles.switchLink}
          href={isSignUp ? "/login" : "/register"}
        >
          {isSignUp ? "I have account" : "Create account"}
        </Link>
      </section>
    </main>
  );
};
