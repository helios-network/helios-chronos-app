# Chronos App

Automated Task Scheduler for Helios Blockchain

## Overview

Chronos App is a proof-of-concept application that allows users to manage and monitor their automated tasks (crons) on the Helios blockchain. Users can connect their wallet and view detailed information about their scheduled smart contract executions.

## Features

- **Wallet Connection**: Connect your wallet using WalletConnect/Reown AppKit
- **Cron Management**: View all your automated tasks with detailed information
- **Real-time Statistics**: Monitor network-wide cron statistics
- **Responsive Design**: Works on desktop and mobile devices
- **Helios Integration**: Direct integration with Helios blockchain RPC

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Reown (formerly WalletConnect) Project ID

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd chronos-app
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your configuration:

```
NEXT_PUBLIC_NODE_ENV=development
NEXT_PUBLIC_BASE_URL=http://localhost:3001
NEXT_PUBLIC_INFURA_KEY=your_infura_key_here
NEXT_PUBLIC_PROJECT_ID=your_reown_project_id_here
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Integration

The app integrates with the Helios blockchain RPC API to fetch cron data:

- **Endpoint**: `http://91.99.37.116:8545`
- **Method**: `eth_getAccountCronsByPageAndSize`
- **Statistics**: `eth_getCronStatistics`

## Cron Data Structure

Each cron contains the following information:

- **ID**: Unique identifier
- **Owner Address**: Wallet address that created the cron
- **Contract Address**: Target smart contract
- **Method Name**: Function to be called
- **Execution Details**: Next execution block, expiration, frequency
- **Gas Configuration**: Gas limit and max gas price
- **Statistics**: Total executions, fees paid
- **Status**: Current execution stage (Pending, Executing, Completed, Failed, Expired)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. **New Components**: Add to `components/` directory with corresponding SCSS modules
2. **API Integration**: Extend `hooks/useCrons.ts` or create new hooks
3. **Types**: Add TypeScript definitions to `types/` directory
4. **Styling**: Use SCSS modules for component-specific styles

## Deployment

1. Build the application:

```bash
npm run build
```

2. Deploy to your preferred platform (Vercel, Netlify, etc.)

3. Update environment variables for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
