import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { SettingsForm } from "./components/settings-form";

interface SettingsPageProps {
    params: {
        storeId: string;
    }
}

const SettingsPage: React.FC<SettingsPageProps> = async ({
    params
}) => {
    const {userId} = auth()

    if(!userId) {
        redirect("/sign-in")
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })

    // Exempel if user change url, then this will redirect them to dashboard
    if (!store) {
        redirect("/")
    }

    return (
        <div>
            <SettingsForm initialData={store} />
        </div>
    )
}
 
export default SettingsPage;