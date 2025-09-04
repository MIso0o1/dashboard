# Dashboard Application

## Overview

This project is a modern dashboard application built with Next.js and React. It provides a customizable interface for displaying various types of information through interactive widgets, including finance, health, investment, to-do lists, and general metrics. The application is designed to be responsive and user-friendly, leveraging a component-based architecture and modern styling frameworks.

## Features

*   **Modular Widgets:** Displays information through a variety of customizable widgets (Finance, Health, Investment, To-Do, Metric).
*   **Responsive Design:** Optimized for various screen sizes, ensuring a consistent experience across desktop and mobile devices.
*   **Theme Toggling:** Supports light and dark modes for user preference.
*   **Component-Based Architecture:** Built with reusable React components for maintainability and scalability.
*   **Modern UI/UX:** Utilizes Radix UI components and Tailwind CSS for a clean and intuitive user interface.

## Technologies Used

*   **Framework:** Next.js, React
*   **Styling:** Tailwind CSS, Radix UI
*   **State Management:** React Hooks
*   **Charting:** Recharts
*   **Form Management:** React Hook Form, Zod

## Setup and Installation

To set up and run the project locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd dashboard-application
    ```

2.  **Install dependencies:**

    The project uses `pnpm` as its package manager. If you don't have `pnpm` installed, you can install it via npm:

    ```bash
    npm install -g pnpm
    ```

    Then, install the project dependencies:

    ```bash
    pnpm install
    ```

3.  **Run the development server:**

    ```bash
    pnpm dev
    ```

    This will start the development server, usually at `http://localhost:3000`.

4.  **Build for production:**

    To create a production-ready build, run:

    ```bash
    pnpm build
    ```

    The build artifacts will be located in the `.next/` directory.

## Project Structure

```
dashboard-application/
├── app/                        # Next.js application routes and layout
├── components/                 # Reusable React components
│   ├── ui/                     # UI components from Radix UI/Shadcn UI
│   └── widgets/                # Specific widget components (e.g., FinanceWidget, HealthWidget)
├── hooks/                      # Custom React hooks
├── lib/                        # Utility functions
├── public/                     # Static assets (images, favicons)
├── styles/                     # Global CSS styles
├── types/                      # TypeScript type definitions
├── .eslintrc.json              # ESLint configuration
├── next-env.d.ts               # Next.js environment type definitions
├── next.config.mjs             # Next.js configuration
├── package.json                # Project dependencies and scripts
├── pnpm-lock.yaml              # pnpm lock file
├── postcss.config.mjs          # PostCSS configuration
└── tsconfig.json               # TypeScript configuration
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue for any bugs or feature requests.

## License

This project is open-source and available under the MIT License.

