'use client';

import { conversationsService } from "@/services/conversationsService";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/auth-context";

export const useConversations = () => {

    const { user } = useAuth();

    const {data, isLoading, isError} = useQuery({
        queryKey: ['myConversations', user?.id],
        queryFn: conversationsService.getConversations,
        enabled: !!user,
    })

    return { 
        conversations: data,
        isLoading,
        isError,
    }
}