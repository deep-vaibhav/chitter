"use client";

import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import axios from "axios";
import { X } from "lucide-react";
import { CheckIcon, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface FriendRequestsProps {
  incomingFriendRequests: IIncomingFriendRequest[];
  sessionId: string;
}

const FriendRequests: FC<FriendRequestsProps> = ({
  incomingFriendRequests,
  sessionId,
}) => {
  const router = useRouter();
  const [friendRequests, setFriendRequests] = useState<
    IIncomingFriendRequest[]
  >(incomingFriendRequests);

  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`user:${sessionId}:incoming_friend_request`)
    );

    const friendRequestHandler = ({
      senderId,
      senderEmail,
    }: IIncomingFriendRequest) => {
      setFriendRequests((prev) => [...prev, { senderEmail, senderId }]);
    };

    pusherClient.bind("incoming_friend_request", friendRequestHandler);

    return () => {
      pusherClient.unsubscribe(`user:${sessionId}:incoming_friend_request`);
      pusherClient.unbind("incoming_friend_request", friendRequestHandler);
    };
  }, []);

  const acceptFriend = async (senderId: string) => {
    await axios.post("/api/friends/accept", { id: senderId });
    setFriendRequests((prev) =>
      prev.filter((request) => request.senderId !== senderId)
    );
    router.refresh();
  };

  const denyFriend = async (senderId: string) => {
    await axios.post("/api/friends/deny", { id: senderId });
    setFriendRequests((prev) =>
      prev.filter((request) => request.senderId !== senderId)
    );
    router.refresh();
  };

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
              <CheckIcon
                onClick={() => acceptFriend(req.senderId)}
                className="font-semibold text-white w-3/4 h-3/4"
              />
            </button>
            <button
              onClick={() => denyFriend(req.senderId)}
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
