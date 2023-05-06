"use client";

import { X } from "lucide-react";
import { CheckIcon, UserPlus } from "lucide-react";
import { FC, useState } from "react";

interface FriendRequestsProps {
  incomingFriendRequests: IIncomingFriendRequest[];
  sessionId: string;
}

const FriendRequests: FC<FriendRequestsProps> = ({
  incomingFriendRequests,
  sessionId,
}) => {
  const [friendRequests, setFriendRequests] = useState<
    IIncomingFriendRequest[]
  >(incomingFriendRequests);

  return (
    <>
      {friendRequests.length === 0 ? (
        <p className="text-sm text-zinc-500">Nothing to show here...</p>
      ) : (
        friendRequests.map((req) => (
          <div key={req.senderId} className="flex gap-4 items-center">
            <UserPlus className="text-black" />
            <p className="font-medium text-lg">{req.senderEmail}</p>

            <button
              aria-label="Accept friend"
              className="h-8 w-8 bg-indigo-400 hover:bg-indigo-500 grid place-items-center rounded-full transition hover:shadow-md"
            >
              <CheckIcon className="font-semibold text-white w-3/4 h-3/4" />
            </button>
            <button
              aria-label="Deny friend"
              className="h-8 w-8 bg-red-400 hover:bg-indigo-500 grid place-items-center rounded-full transition hover:shadow-md"
            >
              <X className="font-semibold text-white w-3/4 h-3/4" />
            </button>
          </div>
        ))
      )}
    </>
  );
};

export default FriendRequests;
