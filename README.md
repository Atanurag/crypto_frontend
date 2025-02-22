# Next.js crypto_frontend 

Welcome to the Next.js project! This repository contains a Next.js application that you can set up and run locally on your machine.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have [Node.js](https://nodejs.org/) installed (version 12.0.0 or later).
- You have [npm](https://www.npmjs.com/) (Node Package Manager) installed, which comes with Node.js.
- You have a code editor like [Visual Studio Code](https://code.visualstudio.com/) installed.

## Getting Started

Follow these steps to set up the project locally:

1. *Clone the repository*

   Open your terminal and run the following command to clone the repository:

   
   git clone https://github.com/Atanurag/crypto_frontend.git
   
2.*Navigate to the project dir*

  cd your-repo-name

3. *Install dependencies*

    npm install

4. *Run the dev server*

   npm run dev

5. *open the browser*

   http://localhost:3000


## Usage

This frontend application provides a comprehensive interface for accessing cryptocurrency data. Below are the key features and usage flow:

### Features

- **Cryptocurrency Filtering**: 
  - The application includes a filter section that allows users to select specific cryptocurrencies. Each cryptocurrency is linked to its corresponding parameters required to access its data.
  
- **Historical Data Display**: 
  - Historical data is presented in two formats:
    - **Grid Format**: A tabular representation of historical data for easy comparison and analysis.
    - **Candlestick Charts**: Visual representation of price movements over time, allowing users to analyze trends and patterns.

- **Real-Time Data Access**: 
  - The application utilizes the Binance Spot WebSocket endpoint to provide real-time data for selected cryptocurrencies. This endpoint is publicly accessible and offers a reliable source of market data.
  - Other exchanges like MEXC, KuCoin, and Bybit, Bybit(futures for historical) are not completely public WebSocket endpoints that are often restricted by token-based access or have un-availability, making them less reliable for real-time data compared to the consistently accessible Binance Spot WebSocket endpoint.

### How to Use

1. **Select Cryptocurrencies**: 
   - Use the filter section to choose the cryptocurrencies you want to analyze. The application will automatically adjust the parameters based on your selection.

2. **View Historical Data**: 
   - Once you have selected the cryptocurrencies, you can view their historical data in both grid and candlestick chart formats.

3. **Access Real-Time Data**: 
   - To start receiving real-time data, click the "Get WS Binance Data" button. This will initiate a connection to the Binance Spot WebSocket endpoint and begin streaming live data for the selected cryptocurrencies.

*Note*

- Ensure that your backend server is running and properly configured to handle requests from the frontend.
- Make sure to have a stable internet connection to receive real-time updates without interruptions.

This application aims to provide a user-friendly experience for cryptocurrency analysis, leveraging the power of real-time data and historical insights.



