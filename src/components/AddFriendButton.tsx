"use client";

import { FC } from "react";
import Button from "./ui/Button";

interface AddFriendButtonProps {}

const AddFriendButton: FC<AddFriendButtonProps> = () => {
  return (
    <form className="max-w-sm">
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Add friend by E-Mail
      </label>
      <div className="mt-2 flex gap-4">
        <input
          type="text"
          placeholder="you@example.com"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-100 sm:text-sm sm:leading-6"
        />
        <Button>Add</Button>
      </div>
    </form>
  );
};

export default AddFriendButton;
