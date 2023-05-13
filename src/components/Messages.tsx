"use client";

import { cn } from "@/lib/utils";
import { Message } from "@/lib/validations/message";
import { FC, useRef, useState } from "react";

interface MessagesProps {
  initialMessages: Message[];
  sessionId: string;
}

const Messages: FC<MessagesProps> = ({ initialMessages, sessionId }) => {
  const scrollDownRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  return (
    <div
      id="messages"
      className="flex h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      <div ref={scrollDownRef} />

      {messages.map((msg, i) => {
        const isCurrentUser = msg.senderId === sessionId;

        const hasNextMsgFromSameUser =
          messages[i - 1].senderId === messages[i].senderId;
        return (
          <div key={`${msg.id}`} className="chat-message">
            <div
              className={cn("flex items-end", {
                "justify-end": isCurrentUser,
              })}
            >
              <div
                className={cn(
                  "flex flex-col space-y-2 text-base max-w-xs mx-2",
                  {
                    "order-1 items-end": isCurrentUser,
                    "order-2 items-start": !isCurrentUser,
                  }
                )}
              >
                <span
                  className={cn("px-4 py-2 rounded-lg inline-block", {
                    "bg-indigo-400 text-white": isCurrentUser,
                    "bg-indigo-200 text-gray-900": !isCurrentUser,
                    "rounded-br-none": !hasNextMsgFromSameUser && isCurrentUser,
                    "rounded-bl-none":
                      !hasNextMsgFromSameUser && !isCurrentUser,
                  })}
                >
                  {msg.text}{" "}
                  <span className="ml-2 tetx-xs text-gray-400">
                    {msg.timestamp}
                  </span>
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
