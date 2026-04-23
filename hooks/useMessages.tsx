'use client';

import { useQuery } from "@tanstack/react-query"
import { messagesService } from "@/services/messagesService"
import { useAuth } from "@/contexts/auth-context";

export const useMessages = (conversationId?: string) => {
    const { user } = useAuth();

    const { data: messages, isLoading, isError} = useQuery({
        queryKey: ['myMessages', conversationId],
        queryFn: () => messagesService.getMessages(conversationId!),
        enabled: !!conversationId && !!user,
    })

    return {
        messages,
        messagesLength: messages?.length ?? 0,
        isLoading,
        isError,
    }
}