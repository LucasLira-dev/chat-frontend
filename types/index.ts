export type Conversation = {
    conversationId: string;
    name: string;
    otherUserId: string;
    lastMessage: {
        content: string;
        createdAt: Date | string;
    } | null;
    isOnline: boolean;
    isTyping?: boolean;
}

export type ConversationsResponse = Conversation[];

export type Message = {
    messageId: string;
    content: string;
    itsme: boolean;
    readAt: Date | null | string;
    createdAt: Date | string;
}

export type MessagesResponse = Message[];