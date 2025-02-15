"use client"

import { ArrowLeftRight, Coins, HomeIcon, LayoutDashboard } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function Sidebar() {
  const router = useRouter();

  return (
    <div className="bg-[#1F1F1F] p-8 px-16 rounded-3xl flex flex-col items-center gap-4 sticky top-0 left-0">
      <h1 className="text-[#DA0046] text-4xl font-bold">PLUTUS</h1>

      <Separator className="bg-white" />

      <div className="flex md:flex-col font-semibold gap-4">
        <Button className="rounded-lg justify-start w-full" variant={"ghost"} onClick={() => router.push("/home")}>
          <HomeIcon style={{ width: 24, height: 24 }} />
          <span className="text-lg hidden sm:block">Home</span>
        </Button>
        <Button className="rounded-lg justify-start w-full" variant={"ghost"} onClick={() => router.push("/dashboard")}>
          <LayoutDashboard style={{ width: 24, height: 24 }} />
          <span className="hidden sm:block text-lg">Dashboard</span>
        </Button>
        <Button className="rounded-lg justify-start w-full" variant={"ghost"} onClick={() => router.push("/tokens")}>
          <Coins style={{ width: 24, height: 24 }} />
          <span className="hidden sm:block text-lg">Tokens</span>
        </Button>
        <Button className="rounded-lg justify-start w-full" variant={"ghost"} onClick={() => router.push("/transactions")}>
          <ArrowLeftRight style={{ width: 24, height: 24 }} />
          <span className="hidden sm:block text-lg">Transactions</span>
        </Button>
      </div>
    </div>
  )
}
