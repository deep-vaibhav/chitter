import AddFriendButton from "@/components/AddFriendButton";
import Head from "next/head";
import { FC } from "react";

const Add: FC = () => {
  return (
    <>
      <Head>
        <title>Add Friend | Chitter</title>
      </Head>

      <main className="pt-8 px-8">
        <h1 className="font-bold text-5xl mb-8">Add a friend</h1>
        <AddFriendButton />
      </main>
    </>
  );
};

export default Add;
