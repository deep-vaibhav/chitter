"use client";

import { chatHrefConstructor } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface SidebarChatListProps {
  friends: IUser[];
  sessionId: string;
}

const SidebarChatList: FC<SidebarChatListProps> = ({ friends, sessionId }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (pathname?.includes("chat")) {
      setUnseenMessages((prev) => {
        return prev.filter((msg) => !pathname.includes(msg.senderId));
      });
    }
  }, [pathname]);

  return (
    <ul role="list" className="max-h-[25rem] overflow-y-auto text-xs space-y-1">
      {friends.sort().map((fr) => {
        const unseenCount = unseenMessages.filter(
          (msg) => msg.senderId === fr.id
        ).length;

        return (
          <li key={fr.id}>
            <a
              href={`/dashboard/chat/${chatHrefConstructor(sessionId, fr.id)}`}
              className="text-gray-700 hover:text-indigo-400 hover:bg-gray-50 flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
            >
              {fr.name}
              {unseenCount > 0 ? (
                <div className="bg-indigo-400 font-medium text-xs text-white w-4 h-4 rounded-full flex justify-center items-center">
                  {unseenCount}
                </div>
              ) : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarChatList;
