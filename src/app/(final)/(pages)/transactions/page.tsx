"use client";

import React from 'react';
import Container from "@/components/final/Container";
import { CheckCircle2, Clock, XCircle, ExternalLink, Copy } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type status = "success" | "pending" | "failed"

interface Transaction {
  currency: string,
  transactionId: string,
  from: string,
  tp: string,
  status: status,
  amount: number,
  logo: string
}

export default function Transactions() {
  const txns: Transaction[] = [
    {
      currency: "BTC",
      transactionId:
        "5CLKMrLDMVceQTSrYvTJ1BfJJetc24s8Qe9SEiBTEscQznhXRUriongqUed5jxqNcvdQJGbC59vtJS5UnGkoi8ap",
      from: "7UpfCGFMWq7u6VCRd6fKwTmcBtCxPcg5JcYEgg4Exzvb",
      tp: "9NfmhosWiMgm7U8m9N6UR1yMEDukN6EuwrAzDfndWC8G",
      status: "success",
      amount: 100,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
    },
    {
      currency: "SOL",
      transactionId:
        "5CLKMrLDMVceQTSrYvTJ1BfJJetc24s8Qe9SEiBTEscQznhXRUriongqUed5jxqNcvdQJGbC59vtJS5UnGkoi8ap",
      from: "7UpfCGFMWq7u6VCRd6fKwTmcBtCxPcg5JcYEgg4Exzvb",
      tp: "9NfmhosWiMgm7U8m9N6UR1yMEDukN6EuwrAzDfndWC8G",
      status: "pending",
      amount: 100,
      logo: "https://seeklogo.com/images/S/solana-sol-logo-12828AD23D-seeklogo.com.png",
    },
    {
      currency: "BTC",
      transactionId:
        "5CLKMrLDMVceQTSrYvTJ1BfJJetc24s8Qe9SEiBTEscQznhXRUriongqUed5jxqNcvdQJGbC59vtJS5UnGkoi8ap",
      from: "7UpfCGFMWq7u6VCRd6fKwTmcBtCxPcg5JcYEgg4Exzvb",
      tp: "9NfmhosWiMgm7U8m9N6UR1yMEDukN6EuwrAzDfndWC8G",
      status: "pending",
      amount: 100,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
    },
    {
      currency: "BTC",
      transactionId:
        "5CLKMrLDMVceQTSrYvTJ1BfJJetc24s8Qe9SEiBTEscQznhXRUriongqUed5jxqNcvdQJGbC59vtJS5UnGkoi8ap",
      from: "7UpfCGFMWq7u6VCRd6fKwTmcBtCxPcg5JcYEgg4Exzvb",
      tp: "9NfmhosWiMgm7U8m9N6UR1yMEDukN6EuwrAzDfndWC8G",
      status: "success",
      amount: 100,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
    },
    {
      currency: "SUI",
      transactionId:
        "5CLKMrLDMVceQTSrYvTJ1BfJJetc24s8Qe9SEiBTEscQznhXRUriongqUed5jxqNcvdQJGbC59vtJS5UnGkoi8ap",
      from: "7UpfCGFMWq7u6VCRd6fKwTmcBtCxPcg5JcYEgg4Exzvb",
      tp: "9NfmhosWiMgm7U8m9N6UR1yMEDukN6EuwrAzDfndWC8G",
      status: "failed",
      amount: 100,
      logo: "https://cryptologos.cc/logos/sui-sui-logo.png",
    },
    {
      currency: "BTC",
      transactionId:
        "5CLKMrLDMVceQTSrYvTJ1BfJJetc24s8Qe9SEiBTEscQznhXRUriongqUed5jxqNcvdQJGbC59vtJS5UnGkoi8ap",
      from: "7UpfCGFMWq7u6VCRd6fKwTmcBtCxPcg5JcYEgg4Exzvb",
      tp: "9NfmhosWiMgm7U8m9N6UR1yMEDukN6EuwrAzDfndWC8G",
      status: "success",
      amount: 100,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
    },
    {
      currency: "BTC",
      transactionId:
        "5CLKMrLDMVceQTSrYvTJ1BfJJetc24s8Qe9SEiBTEscQznhXRUriongqUed5jxqNcvdQJGbC59vtJS5UnGkoi8ap",
      from: "7UpfCGFMWq7u6VCRd6fKwTmcBtCxPcg5JcYEgg4Exzvb",
      tp: "9NfmhosWiMgm7U8m9N6UR1yMEDukN6EuwrAzDfndWC8G",
      status: "success",
      amount: 100,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
    },
    {
      currency: "BTC",
      transactionId:
        "5CLKMrLDMVceQTSrYvTJ1BfJJetc24s8Qe9SEiBTEscQznhXRUriongqUed5jxqNcvdQJGbC59vtJS5UnGkoi8ap",
      from: "7UpfCGFMWq7u6VCRd6fKwTmcBtCxPcg5JcYEgg4Exzvb",
      tp: "9NfmhosWiMgm7U8m9N6UR1yMEDukN6EuwrAzDfndWC8G",
      status: "success",
      amount: 100,
      logo: "https://seeklogo.com/images/S/solana-sol-logo-12828AD23D-seeklogo.com.png",
    },
  ];

  const statusConfig = {
    success: { icon: CheckCircle2, color: "text-green-400", bg: "bg-green-400/10" },
    pending: { icon: Clock, color: "text-yellow-400", bg: "bg-yellow-400/10" },
    failed: { icon: XCircle, color: "text-red-400", bg: "bg-red-400/10" }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="w-full">
      <Container title="Transactions">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th scope="col" className="px-4 py-3 text-left text-gray-400">Asset</th>
                <th scope="col" className="px-4 py-3 text-left text-gray-400">Amount</th>
                <th scope="col" className="px-4 py-3 text-left text-gray-400">From</th>
                <th scope="col" className="px-4 py-3 text-left text-gray-400">To</th>
                <th scope="col" className="px-4 py-3 text-left text-gray-400">Status</th>
                <th scope="col" className="px-4 py-3 text-left text-gray-400">Transaction ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {txns.map((txn, index) => {
                const StatusIcon = statusConfig[txn.status].icon;
                return (
                  <tr key={index} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <img width={20} height={20} src={txn.logo} alt={txn.currency} className="w-6 h-6 rounded-full" />
                        <span className="font-medium text-gray-200">{txn.currency}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-200">
                      {txn.amount} {txn.currency}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <code className="text-gray-400">{truncateAddress(txn.from)}</code>
                        <button className="text-gray-500 hover:text-gray-300">
                          <Copy size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <code className="text-gray-400">{truncateAddress(txn.tp)}</code>
                        <button className="text-gray-500 hover:text-gray-300">
                          <Copy size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${statusConfig[txn.status].bg}`}>
                        <StatusIcon size={14} className={statusConfig[txn.status].color} />
                        <span className={`text-xs font-medium ${statusConfig[txn.status].color}`}>
                          {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <code className="text-gray-400">{truncateAddress(txn.transactionId)}</code>
                        <Link className="text-gray-500 hover:text-gray-300" href={`https://explorer.solana.com/tx/${txn.transactionId}`} target="_blank">
                          <ExternalLink size={14} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
}
