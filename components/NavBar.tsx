"use client";

import { useState } from "react";
import { NavBarSheet } from "./NavBarSheet";
import { NavBarContent } from "./NavBarContent";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

import { MoreVertical } from "lucide-react"
import { useConversations } from "@/hooks/useConversation";
import { ConversationOptions } from "./ConversationOptions";

interface NavBarProps {
    showConversationInfo?: boolean;
    conversationId: string;
};

export const NavBar = ({ showConversationInfo, conversationId }: NavBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { conversations } = useConversations();

  const currentConversation = conversations?.find(conv => conv.conversationId === conversationId);

  const initials = currentConversation?.name?.slice(0, 2)?.toUpperCase() || "U";
  const displayName = currentConversation?.name || "Carregando...";
  const isOnline = currentConversation?.isOnline ?? false;

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40">
        {
            showConversationInfo ? (
                <div className="flex items-center gap-8 p-4 w-full justify-between">
                    <NavBarSheet 
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                    <div className="flex items-center gap-4">
                        <div className="relative shrink-0">
                          <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-sm">
                            {initials}
                          </div>
                          {isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                          )}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">{displayName}</p>
                            {
                              isOnline ? (
                                <p className="text-xs text-green-500">Online</p>
                              ) : (
                                <p className="text-xs text-gray-500">Offline</p>
                              )
                            }
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="lg" className="cursor-pointer">
                            <MoreVertical />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-40" align="end">
                            <DropdownMenuLabel>Opções</DropdownMenuLabel>
                            <DropdownMenuItem className="cursor-pointer"> Apagar mensagens </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer"> Apagar conversa</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ) : (
                <div className="flex items-center justify-between p-4">
                    <NavBarSheet 
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                    <h1 className="text-lg font-bold text-gray-900">Chatwme</h1>
                    <div className="w-10" />
                </div>
            )
        }
      </div>

      <div className="hidden md:flex fixed left-0 top-0 bottom-0 w-80 bg-white border-r border-gray-200 z-40">
        <NavBarContent
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      {showConversationInfo && (
        <div className="hidden md:flex fixed top-0 left-80 right-0 bg-white border-b border-gray-200 z-40 items-center gap-3 p-4 h-16 justify-between">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                {initials}
              </div>
              {isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{displayName}</p>
              {
                isOnline ? (
                  <p className="text-xs text-green-500">Online</p>
                ) : (
                  <p className="text-xs text-gray-500">Offline</p>
                )
              }
            </div>
          </div>
          <ConversationOptions conversationId={conversationId} />
        </div>
      )}

      <div className="md:hidden h-16" />
    </>
  );
};