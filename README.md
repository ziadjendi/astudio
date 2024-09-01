
# AStudio

AStudio is a React-based web application designed to manage and display user and product information. The application is built with TypeScript and Material UI, utilizing modern React features like Context API and custom hooks for state management. 

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Features](#features)
- [Application Structure](#application-structure)
- [Routes](#routes)
- [Theming](#theming)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js**: version 20.15.1
- **npm**: version 10.7.0

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ziadjendi/astudio.git
   cd AStudio
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## Running the Application

To start the development server and run the application locally, use the following command:

```bash
npm run dev
```

The application will start, and you can view it by navigating to `http://localhost:4000` in your browser.

## Features

- **User Management**: Displays a list of users with filtering and pagination capabilities.
- **Product Management**: Displays a list of products with filtering and pagination capabilities.
- **Context API**: Manages global state for users and products.
- **Theming**: Consistent color scheme across the application using Material UI.

## Application Structure

The application is structured as follows:

```
src/
│
├── components/          # Reusable UI components
├── contexts/            # Context API providers for global state
├── features/            # Feature-specific components (Users, Products)
├── hooks/               # Custom React hooks
├── routes/              # Application routes
├── services/            # API services and utilities
├── styles/              # Global and component-specific styles
├── App.tsx              # Main application component
└── main.tsx             # Application entry point
```

## Routes

The application has the following routes:

- **/users/**: Displays the user management page.
- **/products/**: Displays the product management page.
- **/**: Redirects to the `/users` page.

## Theming

The application uses a custom Material UI theme based on the following color palette:

- **Primary Color**: `#c0e3e5` (Blue)
- **Secondary Color**: `#fdc936` (Yellow)
- **Text Color**: `#322625` (Black)
- **Background Color**: `#ebebeb` (Grey)
- **Paper Background**: `#ffffff` (White)

The theme is defined in `src/theme.ts` and applied globally across the application.

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

This project is open-source and available under the [MIT License](LICENSE).
