"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const calculate = (expression: string): string => {
  try {
    // eslint-disable-next-line no-eval
    const result = eval(expression);
    if (isNaN(result) || !isFinite(result)) {
      return "Error";
    }
    return String(result);
  } catch (error) {
    return "Error";
  }
};

export default function Home() {
  const [input, setInput] = useState("0");

  const handleButtonClick = (value: string) => {
    if (value === "C") {
      setInput("0");
    } else if (value === "=") {
      setInput(calculate(input));
    } else {
      setInput((prevInput) => (prevInput === "0" ? value : prevInput + value));
    }
  };

  const buttonValues = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+",
    "C",
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-background">
      <h1 className="text-2xl font-bold mb-4">Calc-U-Later</h1>
      <div className="w-80 rounded-lg shadow-2xl overflow-hidden">
        <div className="bg-secondary/50 p-4 text-right text-2xl font-mono h-16 flex items-center justify-end">
          {input}
        </div>
        <div className="grid grid-cols-4 bg-secondary gap-0.5 p-0.5">
          {buttonValues.map((value) => (
            <Button
              key={value}
              className={`text-xl font-bold h-16 rounded-none shadow-md ${
                value === "=" || value === "C"
                  ? "bg-accent text-primary-foreground hover:bg-accent/80"
                  : "bg-secondary text-primary-foreground hover:bg-secondary/80"
              }`}
              onClick={() => handleButtonClick(value)}
            >
              {value}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
