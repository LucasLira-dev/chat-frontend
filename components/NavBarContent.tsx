'use client';

import { Check, Copy, MessageCircle, Search, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "./ui/button";
import { useAuth } from "@/lib/auth-context";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { AddConnectionCode } from "./AddConnectionCode";
import { useQuery } from "@tanstack/react-query";
import { conversationsService } from "@/services/conversationsService";
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
        <div className="flex flex-col h-full w-full bg-white">
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold tracking-tight text-[#1A1A2E]">
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
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Procurar conversa..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-primary/10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] focus:border-transparent"
                  />
                </div>
              </div>
        
              {/* Conversations List */}
              <div className="flex-1 overflow-y-auto">
                {isLoading ? (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    Carregando conversas...
                  </div>
                ) : isError ? (
                  <div className="p-4 text-center text-red-500 text-sm">
                    Erro ao carregar conversas.
                  </div>
                ) : filteredConversations.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 text-sm">
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
                      className="w-full p-4 border-b border-gray-100 hover:bg-primary/10 transition-colors text-left cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        {/* Avatar */}
                        <div className="relative shrink-0">
                          <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-sm">
                            {conversation.name.slice(0, 2).toUpperCase()}
                          </div>
                          {conversation.isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                          )}
                        </div>
        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-semibold text-gray-900 text-sm">
                              {conversation.name}
                            </h3>
                            <span className="text-xs text-gray-500 ml-2">
                              {conversation.lastMessage?.createdAt ? formatTime(conversation.lastMessage.createdAt) : ""}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 truncate">
                            {conversation.lastMessage?.content || "Nenhuma mensagem ainda."}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
        
              {/* Bottom User Section */}
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                {user && (
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gray-400 text-white flex items-center justify-center font-semibold text-sm">
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">
                        {user.name}
                      </p>
                      <div className="flex items-center gap-2">
                          <code className="text-xs font-mono text-gray-700 truncate line-clamp-1">
                              {smallConnectionCode}
                          </code>
                        <button
                        onClick={handleCopyCode}
                        className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                        title="Copiar código"
                        >
                            {copiedCode ? (
                                <Check size={16} className="text-green-500" />
                            ) : (
                                <Copy size={16} className="text-gray-primary/10" />
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