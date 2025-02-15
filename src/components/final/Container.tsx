"use client";

import { BaseWalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Bell } from "lucide-react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { WalletButton } from "../solana/solana-provider";

interface ContainerProps {
  title: string
  children: React.ReactNode,
}

export default function Container({ title, children }: ContainerProps) {
  const router = useRouter();

  return (
    <div className="h-full flex flex-col">
      <div className="flex rounded-t-3xl">
        <h1 className="p-8 bg-[#1F1F1F] px-16 rounded-t-3xl text-3xl flex items-end font-bold">
          {title}
        </h1>
        <div className='left-[25vw] h-[11vh] w-[52vw] bg-[#1F1F1F]'>
          <div className='w-full h-full flex justify-end gap-5 items-center bg-background rounded-bl-2xl'>
            <Input placeholder="Search" className="w-1/3 rounded-lg" />
            <Button>
              <Bell />
            </Button>

            <WalletButton />

            <SignedOut>
              <SignInButton>
                <Button variant="outline">Login</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                }}
              />
            </SignedIn>

          </div>
        </div>
      </div>
      <div className="bg-[#1F1F1F] rounded-b-3xl flex-1 p-8">
        {children}
      </div>
    </div>
  );
}