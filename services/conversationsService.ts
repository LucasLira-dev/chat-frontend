import { ConversationsResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!API_URL) {
    throw new Error('API URL is not defined. Please set the NEXT_PUBLIC_BACKEND_URL environment variable.');
}

export const conversationsService = {
    createConversation: async (connectionCode: string) => {
        try {
            const response = await fetch(`${API_URL}/conversations/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ connectionCode }),
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create conversation');
            }

            const data = await response.json();

            return data;
        }
        catch (error) {
            console.error('Error creating conversation:', error);
            throw Error('Failed to create conversation');
        }
    },
    getConversations: async () => {
        try {
            const response = await fetch(`${API_URL}/conversations`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch conversations');
            }

            const data: ConversationsResponse = await response.json();
            console.log('Fetched conversations:', data);
            return data;
        }
        catch (error) {
            console.error('Error fetching conversations:', error);
            throw Error('Failed to fetch conversations');
        }
    },
    deleteConversation: async (conversationId: string) => {
        try {
            const response = await fetch(`${API_URL}/conversations/${conversationId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete conversation');
            }

            return {
                message: 'Conversation deleted successfully',
            }
        } 
        catch (error) {
            console.error('Error deleting conversation:', error);
            throw Error('Failed to delete conversation');
        }
    }
}