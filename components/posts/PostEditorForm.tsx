"use client";

import { useActionState, useState } from "react";

import { createPostAction, updatePostAction } from "@/app/actions/posts";
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

const parseTagPreview = (value: string) => {
  const tags = new Map<string, string>();

  value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .forEach((tag) => {
      const slug = slugify(tag);

      if (slug && !tags.has(slug)) {
        tags.set(slug, tag);
      }
    });

  return [...tags.entries()].map(([slug, name]) => ({ name, slug }));
};

type PostEditorFieldsProps = {
  initialValues: PostEditorInitialValues;
  mode: PostEditorMode;
  pending: boolean;
  state: ActionState;
};

type PostEditorMode = "create" | "edit";

export type PostEditorInitialValues = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  tags: string;
  content: string;
  published: boolean;
};

const emptyInitialValues: PostEditorInitialValues = {
  title: "",
  slug: "",
  excerpt: "",
  tags: "",
  content: "",
  published: false,
};

const PostEditorFields = ({
  initialValues,
  mode,
  pending,
  state,
}: PostEditorFieldsProps) => {
  const [title, setTitle] = useState(initialValues.title);
  const [slug, setSlug] = useState(initialValues.slug);
  const [excerpt, setExcerpt] = useState(initialValues.excerpt);
  const [tags, setTags] = useState(initialValues.tags);
  const [content, setContent] = useState(initialValues.content);
  const [slugEdited, setSlugEdited] = useState(mode === "edit");
  const tagPreview = parseTagPreview(tags);

  const handleTitleChange = (value: string) => {
    setTitle(value);

    if (!slugEdited) {
      setSlug(slugify(value));
    }
  };

  const handleSlugChange = (value: string) => {
    setSlug(value);
    setSlugEdited(true);
  };

  return (
    <>
      {mode === "edit" ? (
        <input name="postId" type="hidden" value={initialValues.id ?? ""} />
      ) : null}

      <div className={styles.field}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={title}
          onChange={(event) => handleTitleChange(event.target.value)}
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
          value={slug}
          onChange={(event) => handleSlugChange(event.target.value)}
          required
          maxLength={180}
          pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
        />
        {state.errors?.slug ? <p>{state.errors.slug[0]}</p> : null}
      </div>

      <div className={styles.field}>
        <label htmlFor="excerpt">Excerpt</label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={3}
          maxLength={300}
          value={excerpt}
          onChange={(event) => setExcerpt(event.target.value)}
        />
        {state.errors?.excerpt ? <p>{state.errors.excerpt[0]}</p> : null}
      </div>

      <div className={styles.field}>
        <label htmlFor="tags">Tags</label>
        <input
          id="tags"
          name="tags"
          maxLength={240}
          placeholder="NES, hardware, review"
          value={tags}
          onChange={(event) => setTags(event.target.value)}
        />
        {state.errors?.tags ? <p>{state.errors.tags[0]}</p> : null}
        {tagPreview.length > 0 ? (
          <div className={styles.tagPreview} aria-label="Tag preview">
            {tagPreview.map((tag) => (
              <span className="tag-chip" key={tag.slug}>
                {tag.name}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className={styles.field}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={14}
          required
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        {state.errors?.content ? <p>{state.errors.content[0]}</p> : null}
      </div>

      <label className={styles.toggle}>
        <input
          name="published"
          type="checkbox"
          defaultChecked={initialValues.published}
        />
        <span>Publish now</span>
      </label>

      <div className={styles.actions}>
        <button className="btn" type="submit" disabled={pending}>
          {pending
            ? "Saving..."
            : mode === "edit"
              ? "Save changes"
              : "Save post"}
        </button>
        {state.ok ? (
          <span className={styles.success}>
            {mode === "edit" ? "Post updated." : "Post saved."}
          </span>
        ) : null}
        {state.message ? <span className={styles.error}>{state.message}</span> : null}
      </div>
    </>
  );
};

type PostEditorFormProps = {
  initialValues?: PostEditorInitialValues;
  mode?: PostEditorMode;
};

export const PostEditorForm = ({
  initialValues = emptyInitialValues,
  mode = "create",
}: PostEditorFormProps) => {
  const action = mode === "edit" ? updatePostAction : createPostAction;
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form className={styles.form} action={formAction}>
      <PostEditorFields
        key={
          mode === "create"
            ? state.resetKey ?? "draft"
            : initialValues.id ?? "edit"
        }
        initialValues={initialValues}
        mode={mode}
        pending={pending}
        state={state}
      />
    </form>
  );
};
