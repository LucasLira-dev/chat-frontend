import { ChatMessages } from "@/components/ChatMessages";
import { NavBar } from "@/components/NavBar";
import { authClient } from "@/lib/auth-client";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { conversationsService } from "@/services/conversationsService";

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const requestHeaders = await headers();
  const resolvedParams = await params;
  const conversationId = resolvedParams.id;

  let session = null;
  try {
    session = await authClient.getSession({
      fetchOptions: {
        headers: requestHeaders,
      }
    })
  } catch (error) {
    console.error("Error fetching session:", error);
  }

  if (!session?.data) {
    redirect("/auth");
  }

  if (!conversationId) {
    notFound();
  }

  const conversation = await conversationsService.getOneConversation(
    conversationId,
    requestHeaders.get("cookie") ?? undefined,
  );

  if (!conversation) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background transition-colors">
      <NavBar showConversationInfo conversationId={conversationId} />
      <main className="bg-background md:ml-80 md:pt-16 transition-colors">
        <ChatMessages conversationId={conversationId} />
      </main>
    </div>
  );
}
