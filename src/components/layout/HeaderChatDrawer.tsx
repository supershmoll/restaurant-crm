import { useEffect, useRef, useState } from "react";
import { X, SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { EchoChatMessage, EchoChatStatus } from "@/hooks/useEchoChat";
import { cn } from "@/lib/utils";

type HeaderChatDrawerProps = {
  open: boolean;
  status: EchoChatStatus;
  messages: EchoChatMessage[];
  onClose: () => void;
  onSendMessage: (text: string) => void;
};

export default function HeaderChatDrawer({
  open,
  status,
  messages,
  onClose,
  onSendMessage,
}: HeaderChatDrawerProps) {
  const [draft, setDraft] = useState("");
  const messageListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const nextFrame = requestAnimationFrame(scrollToBottom);
    return function cancelScroll() {
      cancelAnimationFrame(nextFrame);
    };
  }, [messages, open]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.trim()) return;
    onSendMessage(draft);
    setDraft("");
  }

  function handleDraftChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDraft(event.target.value);
  }

  function scrollToBottom() {
    const element = messageListRef.current;
    if (!element) return;
    element.scrollTop = element.scrollHeight;
  }

  return (
    <div className={cn("pointer-events-none fixed inset-0 z-[80]", open && "pointer-events-auto")}>
      <button
        type="button"
        aria-label="Close chat"
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-black/20 opacity-0 transition-opacity",
          open && "opacity-100"
        )}
      />

      <aside
        className={cn(
          "absolute left-0 top-0 flex h-full w-full max-w-md flex-col border-r border-black/8 bg-white shadow-[16px_0_40px_rgba(20,20,20,0.12)] transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-black/8 px-4 py-4 sm:px-5">
          <div>
            <div className="text-lg font-semibold text-text">Live Chat</div>
            <div className="mt-1 text-sm text-text/55">{statusLabel(status)}</div>
          </div>

          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            onClick={onClose}
            className="rounded-full text-text/70 hover:bg-[#F5F5F5] hover:text-text"
            aria-label="Close chat drawer"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div ref={messageListRef} className="flex-1 space-y-3 overflow-y-auto bg-[#FCFCFC] px-4 py-4 sm:px-5">
          {messages.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-black/10 bg-white px-4 py-8 text-center">
              <div className="text-sm font-medium text-text">Start a conversation</div>
              <p className="mt-2 text-sm text-text/55">Messages you send will be echoed back by the websocket server.</p>
            </div>
          ) : (
            messages.map(renderMessage)
          )}
        </div>

        <form onSubmit={handleSubmit} className="border-t border-black/8 bg-white px-4 py-4 sm:px-5">
          <div className="flex items-end gap-3">
            <label className="min-w-0 flex-1">
              <span className="sr-only">Chat message</span>
              <input
                value={draft}
                onChange={handleDraftChange}
                placeholder={status === "connected" ? "Type a message" : "Open chat to connect"}
                className="h-11 w-full rounded-2xl bg-[#F6F6F6] px-4 text-sm text-text ring-1 ring-black/6 outline-none transition focus-visible:ring-2 focus-visible:ring-black/15"
              />
            </label>

            <Button
              type="submit"
              size="icon"
              disabled={!draft.trim() || status !== "connected"}
              className="rounded-2xl bg-dark-button text-white hover:bg-dark-button/90"
              aria-label="Send message"
            >
              <SendHorizonal className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </aside>
    </div>
  );

  function renderMessage(message: EchoChatMessage) {
    return (
      <div
        key={message.id}
        className={cn(
          "max-w-[88%] rounded-2xl px-4 py-3 text-sm shadow-[0_4px_12px_rgba(20,20,20,0.04)]",
          message.kind === "sent" && "ml-auto bg-dark-button text-white",
          message.kind === "received" && "bg-white text-text ring-1 ring-black/6",
          message.kind === "system" && "mx-auto bg-[#F6F6F6] text-center text-text/60 ring-1 ring-black/6"
        )}
      >
        <div>{message.text}</div>
        <div className={cn("mt-1 text-[11px]", message.kind === "sent" ? "text-white/70" : "text-text/40")}>
          {formatTime(message.timestamp)}
        </div>
      </div>
    );
  }
}

function statusLabel(status: EchoChatStatus) {
  if (status === "connected") return "Connected to websocket echo server";
  if (status === "connecting") return "Connecting...";
  if (status === "error") return "Connection error";
  if (status === "disconnected") return "Disconnected";
  return "Open the drawer to connect";
}

function formatTime(timestamp: number) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(timestamp);
}
