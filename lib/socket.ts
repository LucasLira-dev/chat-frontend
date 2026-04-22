import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getExistingSocket = () => socket;

export const getSocket = () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!backendUrl) {
        throw new Error('Backend URL is not defined. Please set the NEXT_PUBLIC_BACKEND_URL environment variable.');
    }

    if (!socket) {
        socket = io(backendUrl, {
            withCredentials: true,
            autoConnect: false,
            transports: ['websocket'],
        })
    }

    return socket;
}
