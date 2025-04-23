"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Copy, Delete, Divide, X, Minus, Plus, Percent, Pi, Logs } from 'lucide-react';
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

const googleColors = ['text-blue-500', 'text-red-500', 'text-yellow-500', 'text-green-500'];

const styles = {
  header: "p-4 flex items-center justify-between",
  appTitle: "text-4xl font-bold text-white shadow-md",
  displayArea: "p-5 rounded-md m-4",
  inputText: "text-xl text-gray-800 text-left",
  resultText: "text-2xl font-bold text-gray-900 text-right",
  button: "bg-white p-4 m-1.5 rounded-lg items-center justify-center shadow-md flex-basis-1/5",
  buttonText: "text-base text-indigo-500",
  historyContainer: "mt-4",
  footer: "p-4 text-center text-gray-500 glow"
}

export default function Home() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const { toast } = useToast();
  const [themeColors, setThemeColors] = useState(googleColors);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
    const isDarkTheme = currentColorIndex >= 2;


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

    const handleThemeChange = () => {
        setCurrentColorIndex((prevIndex) => (prevIndex + 1) % themeColors.length);
    };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-background text-foreground">
      <div className={styles.header}>
        <h1 className={`${styles.appTitle} ${themeColors[0]} transition-colors duration-500`} style={{textShadow: '0 0 8px rgba(0,0,0,0.5)'}}>
          S<span className={themeColors[1]}>c</span>i
          M<span className={themeColors[2]}>a</span>te
        </h1>
        <Button onClick={handleThemeChange}>Change Theme</Button>
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
              {value === "sqrt(" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 9s.5-3 5-3 5 3 5 3"></path>
                  <path d="M7 6v12"></path>
                  <path d="M22 12h-4l-3 5-3-5h-4"></path>
                </svg>
              ) :
                value === "/" ? <Divide size={20}/> :
                  value === "*" ? <X size={20}/> :
                    value === "-" ? <Minus size={20}/> :
                      value === "+" ? <Plus size={20}/> :
                        value === "%" ? <Percent size={20}/> :
                          value === "π" ? <Pi size={20}/> :
                            value === "log(" ? <Logs size={20}/> :
                              value === "ln(" ? <Logs size={20}/> :
                                value === "←" ? <Delete size={20}/> :
                                  value}
            </Button>
          ))}
        </div>
      </div>
        <footer className={styles.footer} style={{textShadow: '0 0 4px rgba(0,0,0,0.8)'}}>
            Copyrights@2025 <br />
            Developed By Sathish
        </footer>
    </div>
  );
}

