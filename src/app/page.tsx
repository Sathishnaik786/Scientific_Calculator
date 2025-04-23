"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Copy, Delete, Divide, X, Minus, Plus, Percent, Pi, Logs, SquareRoot } from 'lucide-react';
import { cn } from "@/lib/utils";

const calculate = (expression: string): string => {
  try {
    expression = expression.replace(/π/g, "Math.PI");
    expression = expression.replace(/e/g, "Math.E");
    expression = expression.replace(/sin\(/g, "Math.sin(");
    expression = expression.replace(/cos\(/g, "Math.cos(");
    expression = expression.replace(/tan\(/g, "Math.tan(");
    expression = expression.replace(/log\(/g, "Math.log10(");
    expression = expression.replace(/ln\(/g, "Math.log(");
    expression = expression.replace(/sqrt\(/g, "Math.sqrt(");
    expression = expression.replace(/\^/g, "**");
    expression = expression.replace(/mod/g, "%");

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

const styles = {
  header: "p-4 bg-indigo-500 items-center",
  appTitle: "text-2xl font-bold text-white",
  displayArea: "p-5 bg-gray-200 rounded-md m-4",
  inputText: "text-xl text-gray-800 text-left",
  resultText: "text-2xl font-bold text-gray-900 text-right",
  button: "bg-white p-4 m-1.5 rounded-lg items-center justify-center shadow-md flex-basis-1/5",
  buttonText: "text-base text-indigo-500",
  historyContainer: "mt-4"
}

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

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
      <div className={styles.header}>
        <h1 className={styles.appTitle}>SciMate</h1>
      </div>

      <div className="w-full max-w-md p-4">
        <div className={styles.displayArea}>
          <Input
            type="text"
            placeholder="Enter expression"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={styles.inputText + " h-12"}
          />
          <p className={styles.resultText}>{calculate(input)}</p>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {buttonValues.map((value) => (
            <Button
              key={value}
              className={cn(
                "text-xl font-bold h-14 rounded-md shadow-md",
                value === "="
                  ? "bg-orange-500 text-white hover:bg-orange-400"
                  : ["C", "←"].includes(value)
                  ? "bg-gray-300 text-gray-700 hover:bg-gray-200"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
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

        <div className={styles.historyContainer}>
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
