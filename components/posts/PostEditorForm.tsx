"use client";

import { useActionState, useMemo, useState } from "react";

import { createPostAction } from "@/app/actions/posts";
import type { ActionState } from "@/app/actions/comments";
import styles from "./PostEditorForm.module.css";

const initialState: ActionState = {
  ok: false,
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const PostEditorForm = () => {
  const [state, formAction, pending] = useActionState(createPostAction, initialState);
  const [title, setTitle] = useState("");
  const generatedSlug = useMemo(() => slugify(title), [title]);

  return (
    <form className={styles.form} action={formAction}>
      <div className={styles.field}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
          maxLength={160}
        />
        {state.errors?.title ? <p>{state.errors.title[0]}</p> : null}
      </div>

      <div className={styles.field}>
        <label htmlFor="slug">Slug</label>
        <input
          id="slug"
          name="slug"
          defaultValue={generatedSlug}
          key={generatedSlug}
          required
          maxLength={180}
          pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
        />
        {state.errors?.slug ? <p>{state.errors.slug[0]}</p> : null}
      </div>

      <div className={styles.field}>
        <label htmlFor="excerpt">Excerpt</label>
        <textarea id="excerpt" name="excerpt" rows={3} maxLength={300} />
        {state.errors?.excerpt ? <p>{state.errors.excerpt[0]}</p> : null}
      </div>

      <div className={styles.field}>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={14} required />
        {state.errors?.content ? <p>{state.errors.content[0]}</p> : null}
      </div>

      <label className={styles.toggle}>
        <input name="published" type="checkbox" />
        <span>Publish now</span>
      </label>

      <div className={styles.actions}>
        <button className="btn" type="submit" disabled={pending}>
          {pending ? "Saving..." : "Save post"}
        </button>
        {state.ok ? <span className={styles.success}>Post saved.</span> : null}
        {state.message ? <span className={styles.error}>{state.message}</span> : null}
      </div>
    </form>
  );
};
