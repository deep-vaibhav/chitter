import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { messageArrayValidator } from "@/lib/validations/message";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { FC } from "react";

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

const getChatMessages = async (chatId: string) => {
  try {
    const result: string[] = await fetchRedis(
      "zrange",
      `chat:${chatId}:messages`,
      0,
      -1
    );
    const messages = result.map((message) => JSON.parse(message) as Message);

    const reversedMessages = messages.reverse();

    const finalMessages = messageArrayValidator.parse(reversedMessages);
    return finalMessages;
  } catch (error) {
    notFound();
  }
};

const ChatPage = async ({ params }: ChatPageProps) => {
  const { chatId } = params;

  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const { user } = session;
  const [userId1, userId2] = chatId.split("--");

  if (user.id !== userId1 && user.id !== userId2) notFound();

  const chatPartnerId = user.id === userId1 ? userId1 : userId2;
  const chatPartner = (await db.get(`user:${chatPartnerId}`)) as IUser;
  const initialMessages = await getChatMessages(chatId);

  return <div></div>;
};

export default ChatPage;
