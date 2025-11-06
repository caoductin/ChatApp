// Model message
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string; // ISO string
  type: "text" | "image" | "file";
  isRead: boolean;
}

// Mock data giữa 2 người
export const messagesMock: Message[] = [
  {
    id: "1",
    senderId: "user1",
    receiverId: "user2",
    content: "Hello! How are you?",
    timestamp: "2025-11-06T10:00:00Z",
    type: "text",
    isRead: true,
  },
  {
    id: "2",
    senderId: "user2",
    receiverId: "user1",
    content: "Hi! I'm good, thanks! And you?",
    timestamp: "2025-11-06T10:01:00Z",
    type: "text",
    isRead: true,
  },
  {
    id: "3",
    senderId: "user1",
    receiverId: "user2",
    content: "Doing well. Check out this picture.",
    timestamp: "2025-11-06T10:02:00Z",
    type: "text",
    isRead: false,
  },
  {
    id: "4",
    senderId: "user1",
    receiverId: "user2",
    content: "https://example.com/image.jpg",
    timestamp: "2025-11-06T10:03:00Z",
    type: "image",
    isRead: false,
  },
  {
    id: "5",
    senderId: "user1",
    receiverId: "user2",
    content: "https://example.com/image.jpg",
    timestamp: "2025-11-06T10:03:00Z",
    type: "image",
    isRead: false,
  },
  {
    id: "25",
    senderId: "user1",
    receiverId: "user2",
    content: "https://example.com/image.jpg",
    timestamp: "2025-11-06T10:03:00Z",
    type: "image",
    isRead: false,
  },
  {
    id: "21235",
    senderId: "user2",
    receiverId: "user2",
    content: "https://example.com/image.jpg",
    timestamp: "2025-11-06T10:03:00Z",
    type: "image",
    isRead: false,
  },
  {
    id: "523",
    senderId: "user1",
    receiverId: "user2",
    content: "https://example.com/image.jpg",
    timestamp: "2025-11-06T10:03:00Z",
    type: "image",
    isRead: false,
  },
];
