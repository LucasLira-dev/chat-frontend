import { ChatMessages } from "@/components/ChatMessages";
import { NavBar } from "@/components/NavBar";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const conversationId = resolvedParams.id;

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

  if (session?.data === null) {
    redirect("/auth");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar showConversationInfo conversationId={conversationId} />
      <main className="bg-gray-50 md:ml-80 md:pt-16">
        <ChatMessages conversationId={conversationId} />
      </main>
    </div>
  );
}
