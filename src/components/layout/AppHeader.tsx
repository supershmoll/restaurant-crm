import { useMemo, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import HeaderChatDrawer from "./HeaderChatDrawer";
import { getUser } from "@/features/auth/authUtils";
import { useEchoChat } from "@/hooks/useEchoChat";

type AppHeaderProps = {
  title?: string;
};

function titleFromPath(pathname: string): string {
  if (pathname === "/") return "Home";

  if (pathname.startsWith("/admin")) {
    if (pathname.startsWith("/admin/employees")) return "Employees";
    return "Admin";
  }

  if (pathname.startsWith("/employee")) {
    if (pathname.startsWith("/employee/tables")) return "Tables";
    if (pathname.startsWith("/employee/orders")) return "Orders";
    return "Employee";
  }

  if (pathname.startsWith("/login")) return "Login";
  return "";
}

export default function AppHeader({ title }: AppHeaderProps) {
  const { location } = useRouterState();
  const computedTitle = useMemo(() => titleFromPath(location.pathname), [location.pathname]);
  const headerTitle = title ?? computedTitle;
  const [chatOpen, setChatOpen] = useState(false);
  const chat = useEchoChat(chatOpen);

  const user = getUser();
  const name = user ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() : "";

  function openChat() {
    setChatOpen(true);
  }

  function closeChat() {
    setChatOpen(false);
  }

  return (
    <>
      <header className="mb-4 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-text">{headerTitle}</h1>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openChat}
            className="grid h-10 w-10 place-items-center rounded-full bg-background-secondary ring-1 ring-text/5 hover:bg-background-primary"
            aria-label="Open live chat"
          >
            <img src="/Bell_pin_light.svg" alt="" className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-background-secondary ring-1 ring-text/5">
              <img src="/User_light.svg" alt="" className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <div
                className="font-inter truncate text-right text-[16px] leading-[16px] font-medium tracking-normal text-text"
                title={name || undefined}
              >
                {name || "—"}
              </div>
            </div>
          </div>
        </div>
      </header>

      <HeaderChatDrawer
        open={chatOpen}
        status={chat.status}
        messages={chat.messages}
        onClose={closeChat}
        onSendMessage={chat.sendMessage}
      />
    </>
  );
}
