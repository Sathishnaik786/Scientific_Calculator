# NovaCalc - Static Scientific Calculator

## Overview

NovaCalc is a static scientific calculator web application built with Next.js, styled with Tailwind CSS and Shadcn UI components. It provides standard and advanced mathematical functions, a clean user interface, and a history of previous calculations.

## Tech Stack

-   **Frontend**: Next.js (React framework)
-   **UI Components**: Shadcn UI, Tailwind CSS
-   **Icons**: Lucide React

## Features

-   Standard arithmetic operations: +, -, ×, ÷
-   Advanced scientific functions: sin, cos, tan, log, ln, sqrt, ^, π, e, mod, parentheses
-   Clear (C) and Delete (←) buttons
-   Dynamic display of input expression and result
-   Calculation history
-   Responsive layout

## Installation

Follow these steps to get NovaCalc running on your local machine.

### Prerequisites

-   Node.js (version 18 or higher)
-   npm or yarn

### Step-by-Step Instructions

1.  **Clone the repository:**

```bash
git clone <repository-url>
cd <project-directory>
```

2.  **Install dependencies:**

Using npm:

```bash
npm install
```

Or, using yarn:

```bash
yarn install
```

3.  **Set up environment variables:**

    Create a `.env` file in the root directory (if it doesn't exist) and add any necessary environment variables. For this project, no specific environment variables are required for basic functionality.  If you intend to use advanced features like external API calls in the future, you would configure those here.

    Example `.env` file:

    ```
    # No specific environment variables required for basic functionality
    ```

4.  **Run the development server:**

Using npm:

```bash
npm run dev
```

Or, using yarn:

```bash
yarn dev
```

This will start the Next.js development server. Open your browser and navigate to `http://localhost:9002` to view the app.

## Usage

1.  **Basic Calculations:**

    Enter mathematical expressions using the on-screen buttons or your keyboard. The result is displayed dynamically as you type.

    [Add Screenshot of Basic Calculation Here]

2.  **Advanced Functions:**

    Use the scientific function buttons (sin, cos, log, etc.) to perform advanced calculations.

    [Add Screenshot of Advanced Calculation Here]

3.  **History:**

    View the history of your previous calculations below the display area.

    [Add Screenshot of Calculation History Here]

## Code Structure

-   `src/app/page.tsx`: Main component for the calculator UI and logic.
-   `src/components/ui/*`: Reusable UI components built with Shadcn UI.
-   `src/lib/utils.ts`: Utility functions (e.g., `cn` for class merging).
-   `tailwind.config.ts`: Tailwind CSS configuration.
-   `src/hooks/*`: Custom React hooks.

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue or submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

-   Built with Next.js, Tailwind CSS, and Shadcn UI.
-   Icons from Lucide React.

    