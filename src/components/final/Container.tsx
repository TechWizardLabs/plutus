"use client";

import { BaseWalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Bell, Search } from "lucide-react"
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
        <h1 className="py-8 bg-[#1F1F1F] px-28 rounded-t-3xl text-3xl flex items-end font-bold">
          {title}
        </h1>
        <div className='h-[11vh] w-full flex flex-col justify-end mr-10 bg-[#1F1F1F]'>
          <div className='w-full h-full flex justify-end gap-5 items-center bg-background rounded-bl-2xl'>
            {/* <Input placeholder="Search" className="w-1/3 rounded-lg" /> */}

            <div className='bg-theme_gray_2-light dark:bg-theme_gray_2-dark w-1/3 h-10 rounded-xl flex gap-2 items-center p-2 shadow-inner dark:shadow-gray-900 border-2 border-theme_gray-light dark:border-theme_gray-dark'>
              <label htmlFor="inp" className='cursor-text'>
                <Search size={22} />
              </label>
              <input type="text" id='inp' placeholder='Search for a....' className='w-full rounded-lg bg-transparent outline-none border-none' />
            </div>

            <Button className="bg-[#232323] text-white hover:text-black h-10 flex gap-2 items-center px-3 py-2 shadow-inner shadow-gray-900 border-2 border-[#232323] rounded-xl">
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