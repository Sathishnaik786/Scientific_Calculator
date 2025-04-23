"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Copy, Delete, Divide, X, Minus, Plus, Percent, Pi, Logs } from 'lucide-react';
import { cn } from "@/lib/utils";

const calculate = (expression: string): string => {
    try {
        if (!expression) {
            return "0"; // Return "0" for empty expression
        }

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
    header: "p-4 items-center justify-center",
    appTitle: "text-4xl font-bold text-center bg-clip-text text-transparent",
    displayArea: "p-5 rounded-md m-4",
    inputText: "text-xl text-gray-800 text-left",
    resultText: "text-2xl font-bold text-gray-900 text-right",
    button: "bg-white p-4 m-1.5 rounded-lg items-center justify-center shadow-md flex-basis-1/5",
    buttonText: "text-base text-indigo-500",
    historyContainer: "mt-4",
    footer: "p-4 text-center"
};

const initialResult = "0";

export default function Home() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState(initialResult);
    const [history, setHistory] = useState<string[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        const calculatedResult = calculate(input);
        setResult(calculatedResult === "Error" ? "0" : calculatedResult);
    }, [input]);

    const handleButtonClick = (value: string) => {
        if (value === "C") {
            setInput("");
            setResult(initialResult);
        } else if (value === "←") {
            setInput((prevInput) => prevInput.slice(0, -1));
        } else if (value === "=") {
            const calculatedResult = calculate(input);
            if (calculatedResult !== "Error") {
                setHistory((prevHistory) => [input + " = " + calculatedResult, ...prevHistory]);
                setInput(calculatedResult);
            } else {
                toast({
                    title: "Invalid Expression",
                    description: "Please check your input and try again.",
                });
            }
        } else {
            setInput((prevInput) => prevInput + value);
        }
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(result);
        toast({
            title: "Copied to clipboard!",
        });
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen" style={{ backgroundColor: '#0033A0', color: '#FFD700' }}>
            <div className={styles.header}>
                <h1 className={styles.appTitle} style={{
                    backgroundImage: 'linear-gradient(to right, #4285F4, #34A853, #FBBC05, #EA4335)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 8px rgba(0, 0, 0, 0.75)'
                }}>NovaCalc</h1>
            </div>

            <div className="w-full max-w-md p-4 rounded-lg border-2 border-double" style={{ borderColor: '#FFD700', boxShadow: '0 0 10px #FFD700' }}>
                <div className={styles.displayArea}>
                    <Input
                        type="text"
                        placeholder="Enter expression"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className={styles.inputText + " h-12"}
                        style={{ color: '#1C1C1C' }}
                    />
                    <p className={styles.resultText} style={{ color: '#1C1C1C' }}>{result}</p>
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
                                value === "/" ? <Divide size={20} /> :
                                    value === "*" ? <X size={20} /> :
                                        value === "-" ? <Minus size={20} /> :
                                            value === "+" ? <Plus size={20} /> :
                                                value === "%" ? <Percent size={20} /> :
                                                    value === "π" ? <Pi size={20} /> :
                                                        value === "log(" ? <Logs size={20} /> :
                                                            value === "ln(" ? <Logs size={20} /> :
                                                                value === "←" ? <Delete size={20} /> :
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
            <footer className="p-4 text-center" style={{ color: '#FFD700', textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>
                Copyrights@2025 <br />
                Developed By Sathish
            </footer>
        </div>
    );
}
