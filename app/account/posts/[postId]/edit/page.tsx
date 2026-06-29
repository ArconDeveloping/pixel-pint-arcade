import { redirect } from "next/navigation";

type LegacyEditPostPageProps = {
  params: Promise<{
    postId: string;
  }>;
};

export default async function LegacyEditPostPage({
  params,
}: LegacyEditPostPageProps) {
  const { postId } = await params;

  redirect(`/admin/posts/${postId}/edit`);
}
