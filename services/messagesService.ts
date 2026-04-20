import { MessagesResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!API_URL) {
    throw new Error('API URL is not defined. Please set the NEXT_PUBLIC_BACKEND_URL environment variable.');
}

export const messagesService = {
    sendMessage: async (content: string, conversationId: string) => {
        try {
            const response = await fetch(`${API_URL}/messages/send/${conversationId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                credentials: 'include',
                body: JSON.stringify({ content }),
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to send message');
            }

            const data = await response.json();
            
            return data;
        }
        catch (error) {
            console.error('Error sending message:', error);
            throw Error('Failed to send message');
        }
    },
    getMessages: async (conversationId: string) => {
        try {
            const response = await fetch(`${API_URL}/messages/${conversationId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch messages');
            }

            const data: MessagesResponse = await response.json();

            return data;
        }
        catch (error) {
            console.error('Error fetching messages:', error);
            throw Error('Failed to fetch messages');
        }
    },
    deleteMessages: async (conversationId: string) => {
        try {
            const response = await fetch(`${API_URL}/messages/${conversationId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                credentials: 'include',           
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete messages');
            }

            return {
                message: 'Messages deleted successfully'
            }
        } catch(error) {
            console.error('Error deleting messages:', error);
            throw Error('Failed to delete messages');
        }
    }
}