export type Conversation = {
    conversationId: string;
    name: string;
    lastMessage: {
        content: string;
        createdAt: Date;
    } | null;
}

export type ConversationsResponse = Conversation[];

export type Message = {
    messageId: string;
    content: string;
    itsme: boolean;
    readAt: Date;
    createdAt: Date;
}

export type MessagesResponse = Message[];