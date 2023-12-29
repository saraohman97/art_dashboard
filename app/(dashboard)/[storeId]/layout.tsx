import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex flex-row w-full">
      <Navbar />
      <div className="ml-72 bg-gray-100 w-full min-h-screen p-8">
        <div className="bg-white w-full h-full p-6 rounded-2xl shadow-lg">
          {children}
        </div>
      </div>
    </div>
  );
}
