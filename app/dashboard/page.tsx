import { SignOutButton } from "@/components/buttons";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { prisma } from "@/lib/prisma";
import { ProfileForm } from "./ProfileForm";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

    console.log(session?.user?.email!);
  const currentUserEmail = session?.user?.email!;
  // const currentUserEmail = 'achangmurillo@gmail.com';
  const user = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
  });

  return (
    <>
      <h1>Dashboard</h1>
      <ProfileForm user={user} />
    </>
  );
}