import { NavBar } from "@/components/NavBar";
import { authClient } from "@/lib/auth-client";
import { MessageCircle } from "lucide-react";
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
      <main className="md:ml-80 ml-0 pt-16">
        <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] md:h-screen">
          <div className="bg-primary/10 rounded-full p-6 mb-8">
            <MessageCircle size={42} className="text-[#6C5CE7]" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Bem-vindo ao Chatwme!
            </h1>
            <p className="text-md text-gray-500">
              Selecione uma conversa para começar a conversar
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
