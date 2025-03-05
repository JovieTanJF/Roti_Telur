# DonorChain - Blockchain Donation Platform

A React + Vite project with a modular and scalable file structure for a blockchain-powered donation platform. The UI has a modern, elegant design using a purple and pink color theme.

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/donor-platform.git
cd donor-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`.

## 📁 Project Structure

```
/donor-platform
 ├── /src
 │    ├── /components  → Reusable UI components
 │    ├── /pages       → Main pages (Login, Dashboard, etc.)
 │    ├── /hooks       → Custom React hooks
 │    ├── /utils       → Utility functions and dummy data
 │    ├── /context     → Context API for global state
 │    ├── /assets      → Images and icons
 │    ├── /graphql     → GraphQL queries
 │    ├── App.jsx      → Main App component
 │    ├── main.jsx     → React entry point
 │    ├── routes.jsx   → Route definitions
 │    ├── index.css    → Global styles
 │    └── config.js    → Configuration file
 ├── package.json
 ├── vite.config.js
 └── README.md
```

## 🧩 Features

- **Wallet Integration**: Connect with Thirdweb (supports Metamask, WalletConnect, Coinbase)
- **Transaction History**: View and track all your donations
- **Organization Directory**: Browse verified recipient organizations
- **Real-time Transaction Tracking**: Monitor the status of your donations
- **Responsive Design**: Works well on desktop, tablet, and mobile devices

## 🛠️ Tech Stack

- **React + Vite**: Fast and modern frontend development
- **Tailwind CSS**: Modern styling with utility classes
- **React Router**: Page navigation
- **Context API**: Global state management
- **GraphQL**: Data fetching (using Apollo Client)
- **Thirdweb**: Blockchain wallet integration

## 📝 Notes

- This is currently using dummy data for development purposes
- The GraphQL integration is prepared but using mocked data
- Real blockchain interactions will be implemented in future updates

## 🧪 Testing

```bash
npm run test
```

## 🏗️ Building for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.