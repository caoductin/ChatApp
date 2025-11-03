import { getSocket } from "./socket";

type SocketEventHandler<T> = (data: T) => void;

function handleSocketEvent<T>(
  eventName: string,
  payload: T | SocketEventHandler<T>,
  off: boolean = false
) {
  const socket = getSocket();
  if (!socket) {
    console.log("Socket is not connected");
    return;
  }

  if (off) {
    socket.off(eventName, payload as SocketEventHandler<T>);
  } else if (typeof payload === "function") {
    socket.on(eventName, payload as SocketEventHandler<T>);
  } else {
    socket.emit(eventName, payload);
  }
}

export const getContacts = <T>(payload: T | SocketEventHandler<T>, off = false) =>
  handleSocketEvent("getContacts", payload, off);

export const testSocket = (payload: any, off: boolean = false) => {
  const socket = getSocket();
  if (!socket) {
    console.log("Socket is not connected");
    return;
  }

  if (off) {
    // turn off listing to this event
    socket.off("testSocket", payload); // payload is the callback
  } else if (typeof payload == "function") {
    socket.on("testSocket", payload); // payload as callback for this event
  } else {
    socket.emit("testSocket", payload); // sending payload as data
  }
};

export const updateProfile = (payload: any, off: boolean = false) => {
  const socket = getSocket();
  if (!socket) {
    console.log("Socket is not connected");
    return;
  }

  if (off) {
    // turn off listing to this event
    socket.off("updateProfile", payload); // payload is the callback
  } else if (typeof payload == "function") {
    socket.on("updateProfile", payload); // payload as callback for this event
  } else {
    socket.emit("updateProfile", payload); // sending payload as data
  }
};

// export const getContacts = (payload: any, off: boolean = false) => {
//   const socket = getSocket();
//   if (!socket) {
//     console.log("Socket is not connected");
//     return;
//   }

//   if (off) {
//     socket.off("getContacts", payload); // payload is the callback
//   } else if (typeof payload == "function") {
//     socket.on("getContacts", payload); // payload as callback for this event
//   } else {
//     socket.emit("getContacts", payload); // sending payload as data
//   }
// };
