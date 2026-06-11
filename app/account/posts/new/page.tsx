import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { PostEditorForm } from "@/components/posts/PostEditorForm";
import { getCurrentSession, requireUserRecord } from "@/data/auth";
import styles from "./NewPostPage.module.css";

export const metadata: Metadata = {
  title: "Write Post | Pixel Pint Arcade",
  description: "Write a new Pixel Pint Arcade post.",
};

export default async function NewPostPage() {
  const session = await getCurrentSession();

  if (!session?.user) {
    redirect("/login");
  }

  const user = await requireUserRecord();

  if (user.role !== "ADMIN") {
    redirect("/account");
  }

  return (
    <main className={styles.page}>
      <div className="wrap">
        <div className={styles.topline}>
          <Link className={styles.backLink} href="/account">
            Back to account
          </Link>
        </div>

        <section className={styles.intro}>
          <div className="eyebrow">New post</div>
          <h1>Write post</h1>
          <p>Create a draft or publish it straight to the blog.</p>
        </section>

        <PostEditorForm />
      </div>
    </main>
  );
}
