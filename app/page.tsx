import { NavBar } from "@/components/NavBar";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {

  let session = null;
    try {
      session = await authClient.getSession({
        fetchOptions: {
          headers: await headers(),
        }
      })
    } catch (error) {
      console.error("Error fetching session:", error);
    }
  
    if (!session?.data) {
      redirect("/auth");
    }
  

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar/>
      <main className="md:ml-80 ml-0 pt-16 md:pt-0">
        <div className="h-full flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Bem-vindo ao Chatwme!
            </h1>
            <p className="text-lg text-gray-600">
              Selecione uma conversa para começar a chamar
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
