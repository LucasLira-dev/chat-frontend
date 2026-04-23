'use client';

import { Check, Copy, MessageCircle, Search, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/auth-context";
import { AddConnectionCode } from "./AddConnectionCode";
import { Conversation } from "@/types";
import { useConversations } from "@/hooks/useConversation";
import { formatTime } from "@/lib/utils";



interface NavBarContentProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    onClose?: () => void;
}

export const NavBarContent = ({ searchQuery, setSearchQuery, onClose }: NavBarContentProps) => {

    const router = useRouter();
    const { user } = useAuth();
    const [copiedCode, setCopiedCode] = useState(false);

    const {conversations: conversationsData, isLoading, isError} = useConversations();

    const conversations = useMemo<Conversation[]>(() => conversationsData ?? [], [conversationsData]);

      const filteredConversations = useMemo(() => {
        return conversations.filter((conv) =>
          conv.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }, [conversations, searchQuery]);
    
      const handleCopyCode = () => {
        if (user) {
          navigator.clipboard.writeText(user.connectionCode);
          setCopiedCode(true);
          setTimeout(() => setCopiedCode(false), 2000);
        }
      };

    const initials = user ? user.name.slice(0, 2).toUpperCase() : "U";
    const smallConnectionCode = user ? user.connectionCode.slice(0, 8) : "N/A";

    return (
        <div className="flex h-full w-full flex-col bg-background transition-colors">
              <div className="border-b border-border p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold tracking-tight text-foreground">
                    Chat<span className="text-[#6C5CE7]">wme</span>
                  </span>
                  <div className="flex items-center gap-4">
                    <AddConnectionCode />
                    <div className="flex items-center gap-2 px-3 py-1 bg-[#5A4BCF] rounded-lg text-sm font-medium text-white mr-8">
                      <MessageCircle size={16} />
                      {conversations.length}
                    </div>
                  </div>
                  
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  <input
                    type="text"
                    placeholder="Procurar conversa..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-border bg-muted/50 py-2 pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] focus:border-transparent"
                  />
                </div>
              </div>
        
              <div className="flex-1 overflow-y-auto">
                {isLoading ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    Carregando conversas...
                  </div>
                ) : isError ? (
                  <div className="p-4 text-center text-red-500 text-sm">
                    Erro ao carregar conversas.
                  </div>
                ) : filteredConversations.length === 0 ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    Nenhuma conversa encontrada
                  </div>
                ) : (
                  filteredConversations.map((conversation) => (
                    <button
                      key={conversation.conversationId}
                      onClick={() => {
                        router.push(`/conversations/${conversation.conversationId}`);
                        onClose?.();
                      }}
                      className="w-full cursor-pointer border-b border-border/60 p-4 text-left transition-colors hover:bg-muted/60"
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative shrink-0">
                          <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-sm">
                            {conversation.name.slice(0, 2).toUpperCase()}
                          </div>
                          {conversation.isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background bg-green-500" />
                          )}
                        </div>
        
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="text-sm font-semibold text-foreground">
                              {conversation.name}
                            </h3>
                            <span className="ml-2 text-xs text-muted-foreground">
                              {conversation.lastMessage?.createdAt ? formatTime(conversation.lastMessage.createdAt) : ""}
                            </span>
                          </div>
                          <p className="truncate text-xs text-muted-foreground">
                            {conversation.lastMessage?.content || "Nenhuma mensagem ainda."}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
        
              <div className="border-t border-border bg-muted/20 p-4 transition-colors">
                {user && (
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-semibold text-foreground">
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {user.name}
                      </p>
                      <div className="flex items-center gap-2">
                          <code className="line-clamp-1 truncate text-xs font-mono text-muted-foreground">
                              {smallConnectionCode}
                          </code>
                        <button
                        onClick={handleCopyCode}
                        className="cursor-pointer rounded p-1 transition-colors hover:bg-muted"
                        title="Copiar código"
                        >
                            {copiedCode ? (
                                <Check size={16} className="text-green-500" />
                            ) : (
                                <Copy size={16} className="text-muted-foreground" />
                            )}
                        </button>
                      </div>
                   </div>
                    <Link href="/settings">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-center cursor-pointer"
                        onClick={onClose}
                      >
                        <Settings size={16} className="mr-2" />
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
    )
}
