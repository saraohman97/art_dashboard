import { UserButton, auth } from "@clerk/nextjs";
import { MainNav } from "@/components/main-nav";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import Link from "next/link";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });

  return (
    <div className="fixed top-0 left-0 bottom-0 shadow-lg w-72 p-6">
      <div className="flex flex-col items-center">
        <Link href='/'>
          <h2 className="mb-4 text-2xl">{store?.name}</h2>
        </Link>

        <MainNav />

        <div className="absolute bottom-6">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
