# **App Name**: Calc-U-Later

## Core Features:

- Keypad UI: Display a numerical keypad (0-9) and operator buttons (+, -, *, /) using Material UI components.
- Display Screen: Display the current input and result. The display area will clearly show the numbers and operators as they are entered, and the final result after calculation.
- Expression Evaluation: Evaluate the expression entered by the user. The evaluation logic will handle operator precedence and basic error checking (e.g., division by zero).

## Style Guidelines:

- Primary color: Light gray (#f0f0f0) for the background to provide a clean look.
- Secondary color: Dark gray (#424242) for the keypad buttons to create contrast.
- Accent: Teal (#009688) for the equals button and other important actions.
- Use a grid layout for the keypad to ensure buttons are evenly spaced and aligned.
- Employ shadows and spacing to mimic the aesthetics of a physical calculator.
- Use a clear, monospaced font for the display screen to ensure numbers and operators are easily readable.

## Original User Request:
🔧 Project Prompt: Static Calculator App

Objective:
Build a static calculator app capable of performing basic arithmetic operations: addition, subtraction, multiplication, and division.
🛠️ Tech Stack:

    Frontend: React Native

    Backend: Java (Spring Boot recommended, even if minimal for static version)

    UI Library: Material UI (use @mui/material components with React Native Web if targeting web as well, otherwise use React Native Paper for Material Design on mobile)

📋 Requirements:
1. Frontend (React Native):

    Create a responsive UI using Material Design components.

    Buttons for numbers (0–9), operations (+, −, ×, ÷), equals (=), and clear (C).

    Display screen for showing input and results.

    No need for navigation or routing.

    All operations handled on the client side (for now, no API call unless backend integration is required later).

2. Backend (Java):

    Set up a basic REST API structure (Spring Boot preferred).

    Create an endpoint /calculate that accepts an arithmetic expression and returns the result.

    Although not needed for the static version, keep the backend ready for future dynamic enhancements.

3. UI Design:

    Clean and intuitive Material UI styling.

    Use shadows, spacing, and responsive layout to mimic physical calculator aesthetics.

    Mobile-first design (should look great on both Android and iOS).

✅ Bonus (Optional):

    Add light/dark mode toggle.

    Include basic input validation (e.g., no divide by zero).

    Deploy frontend via Expo (for easy testing) and backend to a local server or any Java hosting platform.
  