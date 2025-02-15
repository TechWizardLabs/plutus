"use client"

import Container from "@/components/final/Container";
import Strategy from "@/components/final/Strategy";
import { useSocket } from "@/hooks/useSocket";
import { CONNECTED, PREDICTION } from "@/lib/messages";
import { useEffect } from "react";

export default function HomePage() {
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) {
      console.error("No WebSocket connection");
      return;
    }

    console.log("Connected", socket);

    const handleMessage = (event: MessageEvent) => {
      try {
        const messageData = JSON.parse(event.data);
        console.log("Received message:", messageData);

        if (messageData.type === CONNECTED) {
          console.log("Connection successful:", CONNECTED);
        }

        if (messageData.type === PREDICTION) {
          console.log("Received prediction:", PREDICTION);
          console.log(messageData.payload);
          
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socket.addEventListener("message", handleMessage);

    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [socket]);

  return (
    <div className="w-full">
      <Container title="Home">
        <Strategy />
      </Container>
    </div>
  )
}
