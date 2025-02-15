"use client";

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useUser } from "@clerk/nextjs";
import { AlertCircle, Briefcase, RotateCcw } from 'lucide-react';
import React, { FormEvent } from 'react';
import { toast } from 'sonner';
import { Input } from '../ui/input';

function Strategy() {
  const [data, setData] = React.useState({
    duration: "",
    maxProfit: 0,
    maxLoss: 0,
    totalAmount: 0,
    isActive: false,
    userId: "",
  });

  const [formData, setFormData] = React.useState({ ...data });
  const { user, isSignedIn } = useUser();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSignedIn) {
      return toast.error("Please login to create a strategy.");
    }
    if(!formData.duration || !formData.maxProfit || !formData.maxLoss || !formData.totalAmount) {
      return toast.error("Please fill in all fields.");
    }

    try {
      formData.userId = user?.id as string;

      const json = {
        ...formData,
        duration: String(formData.duration),
      };

      const res = await fetch("/api/strategy/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
      });

      if (res.ok) {
        setData({ ...formData, isActive: true });
        return toast.success("Strategy created successfully");
      }

      if (!res.ok) {
        const error = await res.json();
        return toast.error(error.message);
      }
    } catch (error) {
      console.log(error);
      return toast.error("Failed to create strategy");
    }
  };

  const handleReset = async () => {
    try {
      const res = await fetch("/api/strategy/delete", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify({ userId: data.userId }),
      })

      if (res.ok) {
        setData({
          duration: "",
          maxProfit: 0,
          maxLoss: 0,
          totalAmount: 0,
          isActive: false,
          userId: "",
        });
        setFormData({
          duration: "",
          maxProfit: 0,
          maxLoss: 0,
          totalAmount: 0,
          isActive: false,
          userId: "",
        });
        return toast.success("Strategy deleted successfully");
      }

      return toast.error("Failed to delete strategy");
    } catch (error) {
      console.log(error);
      return toast.error("Failed to delete strategy");
    }
  };

  const formatNumber = (value: string) => {
    if (value === "") return "";
    const num = Number(value);
    return value.includes(".") ? value : num.toString();
  };


  return (
    <div className="h-full rounded-xl w-full max-w-md flex flex-col gap-8 p-8 bg-[#0f0f0f]">
      <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
        <Briefcase className="w-6 h-6 text-[#DA0046]" />
        <h2 className="text-xl font-semibold">Investment Strategy</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded w-48">
                {formData.duration ? formData.duration : "Select Duration"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel>Investment Duration</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}
              >
                <DropdownMenuRadioItem value="3 Month">3 Month</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="6 Month">6 Month</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="9 Month">9 Month</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="12 Month">12 Month</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            className="rounded"
            onClick={handleReset}
            type="button"
          >
            Revoke
            <RotateCcw className="ml-2 w-4 h-4" />
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-[#1a1a1a] border-gray-800">
              <label htmlFor="prfinp" className="text-sm text-gray-400">Max Profit</label>
              <div className="flex items-center mt-2 gap-1">
                <Input
                  className="w-full bg-transparent outline-none text-lg rounded"
                  id="prfinp"
                  type="number"
                  max={100}
                  min={0}
                  value={formData.maxProfit}
                  onChange={(e) => {
                    const formattedValue = formatNumber(e.target.value);
                    setFormData(prev => ({ ...prev, maxProfit: Number(formattedValue) }));
                  }}
                />
                <strong className="text-lg">%</strong>
              </div>
            </Card>

            <Card className="p-4 bg-[#1a1a1a] border-gray-800">
              <label htmlFor="lossinp" className="text-sm text-gray-400">Max Loss</label>
              <div className="flex items-center mt-2 gap-1">
                <Input
                  className="w-full bg-transparent outline-none text-lg rounded"
                  id="lossinp"
                  type="number"
                  max={100}
                  min={0}
                  defaultValue={0}
                  onChange={(e) => {
                    const formattedValue = formatNumber(e.target.value);
                    setFormData(prev => ({ ...prev, maxLoss: Number(formattedValue) }));
                  }}
                />
                <strong className="text-lg">%</strong>
              </div>
            </Card>
          </div>

          <Card className="p-4 bg-[#1a1a1a] border-gray-800">
            <label htmlFor="totalamount" className="text-sm text-gray-400">Total Amount</label>
            <div className="flex items-center mt-2">
              <span className="text-lg mr-2">$</span>
              <input
                className="w-full bg-transparent outline-none text-lg"
                id="totalamount"
                type="number"
                placeholder="Enter Amount"
                onChange={(e) => setFormData(prev => ({ ...prev, totalAmount: Number(e.target.value) }))}
              />
            </div>
          </Card>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#DA0046] hover:bg-[#BA0039] text-white rounded py-6 text-lg"
        >
          Create Strategy
        </Button>
      </form>

      <div className="border-t border-gray-800">
        {data.isActive ? (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <p className="text-gray-400">Duration</p>
              <p className="font-semibold">{data.duration}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-[#1a1a1a] border-gray-800">
                <p className="text-sm text-gray-400">Max Profit</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-lg font-semibold">{data.maxProfit}</p>
                  <p className="text-lg">%</p>
                </div>
              </Card>

              <Card className="p-4 bg-[#1a1a1a] border-gray-800">
                <p className="text-sm text-gray-400">Max Loss</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-lg font-semibold">{data.maxLoss}</p>
                  <p className="text-lg">%</p>
                </div>
              </Card>
            </div>

            <Card className="p-4 bg-[#1a1a1a] border-gray-800">
              <p className="text-sm text-gray-400">Total Amount</p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-lg font-semibold">${data.totalAmount}</p>
              </div>
            </Card>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-8 text-gray-400">
            <AlertCircle className="w-12 h-12" />
            <p className="text-lg">No Active Strategy</p>
            <p className="text-sm text-center">Create a new strategy by filling out the form above</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Strategy;