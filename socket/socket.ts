import { API_URL } from "@/constants";
import { Token } from "@/context/authContext";
import { storage } from "@/storage";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export async function connectSocket(): Promise<Socket> {
  const token = await storage.getItem(Token);
  if (!token) {
    throw Error("no token found");
  }
  if (!socket) {
    socket = io(API_URL, {
      auth: { token },
      transports: ["websocket"],
    });

    await new Promise((resolve, reject) => {
      socket?.on("connect", () => {
        console.log("socket connected!", socket?.id);
        resolve(true);
      });

      socket?.on("connect_error", (err) => {
        console.log("connect socket error", err.message);
      });
    });

    socket.on("disconnect", () => {
      console.log("disconnect socket");
    });
  }

  return socket;
}

export function getSocket(): Socket | null {
  return socket;
}

export function disConnectSocket(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
