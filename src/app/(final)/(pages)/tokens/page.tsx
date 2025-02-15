"use client";

import { useState } from 'react';
import Container from "@/components/final/Container";

interface Token {
  symbol: string;
  name: string;
  amount: number;
  value: number;
  pnl: number;
  pnlPercentage: number;
  ethValue?: string;
  icon: string;
}

export default function Tokens() {
  const [tokens] = useState<Token[]>([
    {
      symbol: "ALMX",
      name: "Bitcoin",
      amount: 1708.61,
      value: 26.64,
      pnl: 7414.91,
      pnlPercentage: 27.27,
      icon: "https://s2.coinmarketcap.com/static/img/coins/200x200/8613.png"
    },
    {
      symbol: "BTC",
      name: "Bitcoin",
      amount: 1708.61,
      value: 26.64,
      pnl: 1457,
      pnlPercentage: 22.25,
      ethValue: "0.0456 ETH",
      icon: "https://s2.coinmarketcap.com/static/img/coins/200x200/1839.png"
    },
    {
      symbol: "BTC",
      name: "Bitcoin",
      amount: 1708.61,
      value: 26.64,
      pnl: 1457,
      pnlPercentage: 22.25,
      ethValue: "0.0456 ETH",
      icon: "https://s3.coinmarketcap.com/static-gravity/image/5bd0f43855f6434386c59f2341c5aaf0.png"
    }
  ]);

  const totalValue = tokens.reduce((sum, token) => sum + token.value, 0);
  const totalPnl = tokens.reduce((sum, token) => sum + token.pnl, 0);
  const totalPnlPercentage = (totalPnl / totalValue) * 100;

  return (
    <div className="w-full">
      <Container title="Tokens">
        <div className="flex flex-col gap-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-theme_black-light dark:bg-theme_gray_2F2F2F-dark rounded-xl p-6">
              <h2 className="text-gray-400 mb-2">Tokens Worth</h2>
              <div className="text-3xl font-bold">${totalValue.toLocaleString()}</div>
              <div className="text-green-500 mt-1">
                +{totalPnlPercentage.toFixed(2)}% (${totalPnl.toLocaleString()})
              </div>
            </div>
            <div className="bg-theme_black-light dark:bg-theme_gray_2F2F2F-dark rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-400">Dominant token</h3>
                <div className="text-sm text-gray-400">Total Tokens: {tokens.length}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={tokens[0].icon} alt={tokens[0].symbol} className="w-6 h-6 rounded-full" />
                  <span className="font-medium">{tokens[0].symbol}</span>
                </div>
                <div className="text-green-500">
                  +${tokens[0].pnl.toLocaleString()} ({tokens[0].pnlPercentage}%)
                </div>
              </div>
            </div>
          </div>

          {/* Tokens List */}
          <div className="bg-theme_black-light dark:bg-theme_gray_2F2F2F-dark rounded-xl overflow-hidden">
            <div className="grid grid-cols-[auto_1fr_1fr_1fr] gap-4 p-4 border-b border-gray-800 text-gray-400">
              <div>Token</div>
              <div className="text-right">Amount</div>
              <div className="text-right">Value</div>
              <div className="text-right">Profit/Loss</div>
            </div>
            <div className="divide-y divide-gray-800">
              {tokens.map((token, index) => (
                <div key={index} className="grid grid-cols-[auto_1fr_1fr_1fr] gap-4 p-4 items-center hover:bg-gray-800/50">
                  <div className="flex items-center gap-2">
                    <img src={token.icon} alt={token.symbol} className="w-8 h-8 rounded-full" />
                    <div>
                      <div className="font-medium">{token.symbol}</div>
                      <div className="text-sm text-gray-400">{token.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div>{token.amount.toLocaleString()}</div>
                    {token.ethValue && (
                      <div className="text-sm text-gray-400">{token.ethValue}</div>
                    )}
                  </div>
                  <div className="text-right">
                    ${token.value.toLocaleString()}
                  </div>
                  <div className="text-right text-green-500">
                    +${token.pnl.toLocaleString()} ({token.pnlPercentage}%)
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}