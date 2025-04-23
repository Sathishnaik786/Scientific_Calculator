"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Copy, Delete, Divide, X, Minus, Plus, Percent, Pi, Logs,  } from 'lucide-react';
import { Square as SquareRoot } from 'lucide-react';

const calculate = (expression: string): string => {
  try {
    // Replace constants and functions with their Math equivalents
    expression = expression.replace(/π/g, "Math.PI");
    expression = expression.replace(/e/g, "Math.E");
    expression = expression.replace(/sin\(/g, "Math.sin(");
    expression = expression.replace(/cos\(/g, "Math.cos(");
    expression = expression.replace(/tan\(/g, "Math.tan(");
    expression = expression.replace(/log\(/g, "Math.log10("); // Common log
    expression = expression.replace(/ln\(/g, "Math.log(");   // Natural log
    expression = expression.replace(/sqrt\(/g, "Math.sqrt(");
    expression = expression.replace(/\^/g, "**");
    expression = expression.replace(/mod/g, "%");

    // eslint-disable-next-line no-eval
    let result;
    try {
        result = eval(expression);
    } catch (e) {
        return "Error";
    }
    if (isNaN(result) || !isFinite(result)) {
      return "Error";
    }
    return String(result);
  } catch (error) {
    return "Error";
  }
};

export default function Home() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const { toast } = useToast();

  const handleButtonClick = (value: string) => {
    if (value === "C") {
      setInput("");
    } else if (value === "←") {
      setInput((prevInput) => prevInput.slice(0, -1));
    } else if (value === "=") {
      const result = calculate(input);
      setHistory((prevHistory) => [input + " = " + result, ...prevHistory]);
      setInput(result);
    } else {
      setInput((prevInput) => prevInput + value);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(input);
    toast({
      title: "Copied to clipboard!",
    });
  };

  const buttonValues = [
    "C", "←", "(", ")",
    "sin(", "cos(", "tan(", "/",
    "log(", "ln(", "sqrt(", "*",
    "7", "8", "9", "-",
    "4", "5", "6", "+",
    "1", "2", "3", "^",
    "0", ".", "=", "mod",
    "π", "e", "%",
  ];

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-2 bg-background">
      <h1 className="text-3xl font-bold mt-4">Scientific Calc-U-Later</h1>

      <div className="w-full max-w-md p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Input
            type="text"
            placeholder="Enter expression"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow text-xl font-mono h-12"
          />
          <Button onClick={handleCopyToClipboard} variant="secondary" size="icon">
            <Copy className="h-4 w-4" />
            <span className="sr-only">Copy</span>
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {buttonValues.map((value) => (
            <Button
              key={value}
              className={`text-xl font-bold h-14 rounded-md shadow-md
                ${value === "=" ? "bg-accent text-accent-foreground hover:bg-accent/80" :
                  ["C", "←"].includes(value) ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" :
                    "bg-secondary/50 text-primary-foreground hover:bg-secondary/80"
                }`}
              onClick={() => handleButtonClick(value)}
            >
              {value === "sqrt(" ? <SquareRoot/> :
                value === "/" ? <Divide/> :
                  value === "*" ? <X/> :
                    value === "-" ? <Minus/> :
                      value === "+" ? <Plus/> :
                        value === "%" ? <Percent/> :
                          value === "π" ? <Pi/> :
                            value === "log(" ? <Logs/> :
                              value === "ln(" ? <Logs/> :
                                value === "←" ? <Delete/> :
                                  value}
            </Button>
          ))}
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">History</h2>
          {history.length > 0 ? (
            <ul className="divide-y divide-border rounded-md border">
              {history.map((item, index) => (
                <li key={index} className="py-2 px-4">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No history yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
