// app/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AuthNavbar from "@/components/AuthNavbar";
import NoAuthNavbar from "@/components/NoAuthNavbar";
import DashboardPage from "@/app/dashboard/page";
import SignupPage from "@/app/signup/page";
export default async function HomePage() {
  const session = await getServerSession(); 

  if (session) {
    return (
      <>
        <AuthNavbar />
        <DashboardPage />
      </>
    );
  } else {
    return (
      <>
        <NoAuthNavbar />
        <SignupPage />
      </>
    );
  }
}
