import { redirect } from "next/navigation";

import { AuthPanel } from "@/components/auth/AuthPanel";
import { getCurrentSession } from "@/data/auth";

const googleEnabled =
  Boolean(process.env.GOOGLE_CLIENT_ID) &&
  Boolean(process.env.GOOGLE_CLIENT_SECRET) &&
  !process.env.GOOGLE_CLIENT_ID?.startsWith("replace-") &&
  !process.env.GOOGLE_CLIENT_SECRET?.startsWith("replace-");

export default async function RegisterPage() {
  const session = await getCurrentSession();

  if (session?.user) {
    redirect("/account");
  }

  return <AuthPanel mode="sign-up" googleEnabled={googleEnabled} />;
}
