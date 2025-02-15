import Chatbot from "@/components/final/Chatbot";
import Sidebar from "@/components/final/Sidebar";
import { Ubuntu } from "next/font/google";
import { Toaster } from "sonner";

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['400', '500', '700']
})

export default function FinalLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className={`h-screen w-full flex p-3 gap-3 ${ubuntu.className}`}>
      <Sidebar />
      {children}
      <Chatbot />
      <Toaster />
    </main>
  )
}