import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Header } from "@/components/layout/Header";
import { DonorSidebar } from "@/components/layout/DonorSidebar";

export default async function DonorLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <>
      <Header />
      <div className="flex flex-col lg:flex-row pt-24">
        <DonorSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-10">{children}</main>
      </div>
    </>
  );
}
