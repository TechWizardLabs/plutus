"use client"

import Container from "@/components/final/Container";
import PredictionCard from "@/components/final/PredictionCard";
import Strategy from "@/components/final/Strategy";
import { useSocket } from "@/hooks/useSocket";
import { CONNECTED, PREDICTION } from "@/lib/messages";
import { useEffect, useState } from "react";

interface PredictionData {
  coin: "SOLANA" | "ETHEREUM";
  weekly_predictions: number[];
  weekly_dca_strategy: number[];
}

export default function HomePage() {
  const { socket } = useSocket();

  const [data, setData] = useState<PredictionData[]>([]);



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
          if (messageData.payload.coin === "SOLANA") {
            if (data?.find((v) => (v.coin === "SOLANA"))) setData([...data.map((v) => (v.coin === "SOLANA" ? messageData.payload : v))]);
            else setData([...data, messageData.payload]);
          }
          if (messageData.payload.coin === "ETHEREUM") {
            if (data?.find((v) => (v.coin === "ETHEREUM"))) setData([...data.map((v) => (v.coin === "ETHEREUM" ? messageData.payload : v))]);
            else setData([...data, messageData.payload]);
          }

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
        <div className="flex gap-12">
          <Strategy />
          <div className="flex flex-wrap gap-4 justify-center">
            {data.map((prediction, index) => (
              <PredictionCard key={index} {...prediction} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
