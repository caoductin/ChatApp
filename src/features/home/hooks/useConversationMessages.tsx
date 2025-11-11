import {
  getConversations,
  getMessages,
  newMessages,
} from "@/socket/socketEvent";
import { MessageProps, ResponseProps, UserProps } from "@/types";
import { useEffect, useState } from "react";
import uuid from "react-native-uuid";

export const useConversationMessages = (
  user: UserProps | null,
  conversationId: string
) => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [text, onChangeText] = useState("");
  console.log("this is user , conversationid", user, conversationId)

  useEffect(() => {
    newMessages(newMessageHandler);
    getMessages(getMessageHandler);
    getMessages({ conversationId });

    return () => {
      newMessages(newMessageHandler, true);
      getMessages(getMessageHandler, true);
    };
  }, [conversationId]);

  useEffect(() => {
    console.log("this is message", messages);
  }, [messages]);

  const getMessageHandler = (res: ResponseProps) => {
    console.log("this is success", res.success)
    setMessages(res.data);
    if (res.success) setMessages(res.data);
    console.log("this is message new message", res.data)
  };

  const newMessageHandler = (res: ResponseProps) => {
    if (!res.success) return;

    const { tempId, createdAt } = res.data;
    if (res.data.sender.id === user?.id) {
      setMessages((prev) => {
        const index = prev.findIndex((m) => m.tempId === tempId);
        if (index !== -1) {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            createdAt,
            isSending: false,
          };
          return updated;
        }
        return [...prev];
      });
    } else if (res.data.conversationId === conversationId) {
      setMessages((prev) => [res.data, ...prev]);
    }
  };

  const sendMessage = () => {
    if (!user || !text.trim()) return;

    const tempId = uuid.v4();
    const newMessage: MessageProps = {
      id: Date.now().toString(),
      sender: {
        _id: user.id,
        name: user.name,
        avatar: user.avatar ?? "",
      },
      content: text,
      attachement: null,
      isMe: true,
      createdAt: new Date().toISOString(),
      isSending: true,
      tempId,
    };

    setMessages((prev) => [newMessage, ...prev]);
    newMessages({
      conversationId,
      sender: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
      },
      content: text.trim(),
      attachement: "",
      tempId,
    });

    onChangeText("");
  };

  return {
    messages,
    text,
    onChangeText,
    sendMessage,
    getMessageHandler,
    getConversations,
    newMessageHandler,
  };
};
