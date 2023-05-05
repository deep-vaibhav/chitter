"use client"; // make this explicity a client component

import Button from "@/components/ui/Button";
import { SVGIcons } from "@/components/ui/Icons";
import { FC, useState } from "react";
import { signIn } from "next-auth/react";

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      signIn("google");
    } catch (error) {
      // TODO : add toast message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full flex flex-col items-center max-w-md space-y-8">
          <div className="flex flex-col items-center gap-8">
            <p className="font-extrabold tracking-wide text-cyan-700">
              chitter
            </p>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
              Sign in to your account
            </h2>
          </div>

          <Button
            isLoading={isLoading}
            type="button"
            className="max-w-sm max-auto"
            onClick={loginWithGoogle}
          >
            {isLoading ? (
              "Logging you in..."
            ) : (
              <>
                {" "}
                <SVGIcons.GoogleIcon size={24} />
                <span className="ml-2">Continue with Google</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;
