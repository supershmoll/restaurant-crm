import { useEffect, useRef, useState } from "react";

const ECHO_SERVER_URL = "wss://ws.ifelse.io";

export type EchoChatStatus = "idle" | "connecting" | "connected" | "disconnected" | "error";

export type EchoChatMessage = {
  id: string;
  kind: "sent" | "received" | "system";
  text: string;
  timestamp: number;
};

export function useEchoChat(open: boolean) {
  const socketRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<EchoChatStatus>("idle");
  const [messages, setMessages] = useState<EchoChatMessage[]>([]);

  useEffect(() => {
    if (!open) {
      closeSocket();
      setStatus("idle");
      return;
    }

    const socket = new WebSocket(ECHO_SERVER_URL);
    socketRef.current = socket;
    setStatus("connecting");

    socket.addEventListener("open", handleOpen);
    socket.addEventListener("message", handleMessage);
    socket.addEventListener("error", handleError);
    socket.addEventListener("close", handleClose);

    return function cleanupConnection() {
      socket.removeEventListener("open", handleOpen);
      socket.removeEventListener("message", handleMessage);
      socket.removeEventListener("error", handleError);
      socket.removeEventListener("close", handleClose);
      closeSocket();
    };
  }, [open]);

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const socket = socketRef.current;
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      appendMessage("system", "Socket is not connected yet.");
      return;
    }

    socket.send(trimmed);
    appendMessage("sent", trimmed);
  }

  function reconnect() {
    closeSocket();
    setStatus("disconnected");
    setMessages((current) => [...current]);
  }

  return {
    status,
    messages,
    sendMessage,
    reconnect,
  };

  function handleOpen() {
    setStatus("connected");
    appendMessage("system", "Connected to echo chat.");
  }

  function handleMessage(event: MessageEvent<string>) {
    appendMessage("received", event.data);
  }

  function handleError() {
    setStatus("error");
    appendMessage("system", "WebSocket connection error.");
  }

  function handleClose() {
    setStatus("disconnected");
    appendMessage("system", "WebSocket disconnected.");
    socketRef.current = null;
  }

  function closeSocket() {
    const socket = socketRef.current;
    if (!socket) return;
    if (socket.readyState === WebSocket.CLOSED || socket.readyState === WebSocket.CLOSING) return;
    socket.close(1000, "Drawer closed");
    socketRef.current = null;
  }

  function appendMessage(kind: EchoChatMessage["kind"], text: string) {
    setMessages((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        kind,
        text,
        timestamp: Date.now(),
      },
    ]);
  }
}
