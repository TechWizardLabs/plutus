"use client";

import Container from "@/components/final/Container";
import {
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PriceData {
  time: string;
  value: number;
}

interface StatsCardProps {
  title: string;
  amount: string;
  change: string;
  changeAmount: string;
}

interface TokenStatsCardProps {
  title: string;
  icon?: string;
  symbol?: string;
  change?: string;
  percentage?: string;
  value?: string;
}

export default function Dashboard() {
  const [chartData, setChartData] = useState<ChartData<"line"> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1"
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        const prices: PriceData[] = data.prices
          .filter((_: number[], index: number) => index % 6 === 0)
          .map((price: number[]) => ({
            time: new Date(price[0]).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            value: price[1],
          }));

        const labels = prices.map((entry) => entry.time);
        const values = prices.map((entry) => entry.value);

        setChartData({
          labels,
          datasets: [
            {
              label: "Bitcoin Price (Last 24 Hours)",
              data: values,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.1)",
              borderWidth: 2,
              tension: 0.4,
              pointRadius: 0,
              fill: true,
            },
          ],
        });
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
        console.error("Error fetching price data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistoricalData();
  }, []);

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#666",
          maxTicksLimit: 8,
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#666",
          maxTicksLimit: 6,
        },
      },
    },
  };

  if (error) {
    return (
      <div className="w-full">
        <Container title="Dashboard">
          <div className="text-red-500">Error loading dashboard: {error}</div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Container title="Dashboard">
        <div className="flex flex-col gap-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            <StatsCard
              title="Tokens Worth"
              amount="7,414.91"
              change="+3.99"
              changeAmount="284.26"
            />
            <StatsCard
              title="DeFi Worth"
              amount="7,414.91"
              change="+3.99"
              changeAmount="284.26"
            />
            <StatsCard
              title="Wallet Worth"
              amount="7,414.91"
              change="+3.99"
              changeAmount="284.26"
            />
          </div>

          <div className="flex gap-6">
            <div className="w-2/3">
              <div className="bg-theme_gray-light dark:bg-theme_gray-dark rounded-xl p-6 h-[400px]">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-gray-400">Loading chart data...</span>
                  </div>
                ) : chartData ? (
                  <Line data={chartData} options={chartOptions} />
                ) : null}
              </div>
            </div>

            <div className="w-1/3 flex flex-col gap-4">
              <div className="bg-theme_gray-light dark:bg-theme_gray-dark rounded-xl p-4">
                <div className="flex flex-col gap-4">
                  <TokenStatsCard
                    title="Dominant Token"
                    icon="https://s2.coinmarketcap.com/static/img/coins/200x200/8613.png"
                    symbol="ALMX"
                    change="+7,414.91"
                    percentage="27.27"
                  />
                  <TokenStatsCard
                    title="Tokens"
                    value="37"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function StatsCard({ title, amount, change, changeAmount }: StatsCardProps) {
  return (
    <div className="bg-theme_black-light dark:bg-theme_gray_2F2F2F-dark rounded-xl p-4">
      <div className="flex flex-col gap-2">
        <span className="text-gray-400">{title}</span>
        <span className="text-2xl font-bold">${amount}</span>
        <span className="text-green-400 text-sm">
          {change}% (${changeAmount})
        </span>
      </div>
    </div>
  );
}

function TokenStatsCard({ title, icon, symbol, change, percentage, value }: TokenStatsCardProps) {
  if (value) {
    return (
      <div className="bg-theme_black-light dark:bg-theme_gray_2F2F2F-dark rounded-xl p-4">
        <span className="text-gray-400">{title}</span>
        <div className="mt-2">
          <span className="text-2xl font-bold">{value}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-theme_black-light dark:bg-theme_gray_2F2F2F-dark rounded-xl p-4">
      <span className="text-gray-400">{title}</span>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          {icon && <img src={icon} alt={symbol} className="w-6 h-6 rounded-full" />}
          <span>{symbol}</span>
        </div>
        <span className="text-green-400">
          ${change} ({percentage}%)
        </span>
      </div>
    </div>
  );
}