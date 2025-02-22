import { useEffect, useState, useRef } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

const CryptoChart = ({ cryptoName }) => {
  const [chartData, setChartData] = useState([]);
  const chartRef = useRef(null); // Reference to Highcharts instance

  useEffect(() => {
    const ws = new WebSocket("wss://5c8c2a0d-ca5e-42e9-a43d-f431d4ae066f-00-8hlx8r8eujc3.sisko.replit.dev/");
    ws.onmessage = (event) => {
        try {
         // console.log("📩 Raw WebSocket Message:", event.data); // Debugging
          const data = JSON.parse(event.data);
      
          if (data.k) {
            const { t, o, h, l, c, v } = data.k; // Extract relevant fields
      
            if (!t || !o || !h || !l || !c || !v) {
              console.warn("⚠️ Missing data fields:", data.k);
              return; // Ignore incomplete messages
            }
      
            const volume = parseFloat(v) || 0; // Default to 0 if volume is undefined

            const newCandle = [
              t, // Timestamp
              parseFloat(o), // Open
              parseFloat(h), // High
              parseFloat(l), // Low
              parseFloat(c), // Close
              volume, // Ensure volume is included
            ];
            
      
            setChartData((prevData) => {
              const updatedData = [...prevData.slice(-99), newCandle]; // Keep only last 100 candles
              return updatedData;
            });
      
            // Update chart dynamically
            if (chartRef.current) {
              const series = chartRef.current.chart.series[0];
              series.addPoint(newCandle, true, series.data.length >= 100);
            }
          }
        } catch (error) {
          console.warn("⚠️ Error parsing WebSocket message:", event.data);
        }
      };
      

    return () => ws.close();
  }, []);

  const chartOptions = {
    title: { text: cryptoName },
    chart: { height: 600 },
    xAxis: { type: "datetime" },
    yAxis: [
      {
        title: { text: "Price" },
        height: "70%", // Price chart occupies 70%
        lineWidth: 2,
      },
      {
        title: { text: "Volume" },
        top: "75%", // Volume chart starts after 70% height
        height: "25%", // Volume chart occupies 25%
        offset: 0,
        lineWidth: 2,
      },
    ],
    navigator: { enabled: true },
    scrollbar: { enabled: true },
    rangeSelector: { enabled: true },
    series: [
      {
        type: "candlestick",
        name: "Binance",
        lastPrice: {
          enabled: true,
          label: { enabled: true, backgroundColor: "orange" },
        },
        color: "red",
        upColor: "green",
        data: chartData.map((candle) => [candle[0], candle[1], candle[2], candle[3], candle[4]]), // Exclude volume
      },
      {
        type: "column", // Bar chart for volume
        name: "Volume",
        yAxis: 1, // Assign volume to the second y-axis
        data: chartData.map((candle) => [candle[0], candle[5]]), // Volume data
        color: "#7cb5ec", // Volume bars color
      },
    ],
  };
  

  return (

<div className="flex justify-center items-center min-h-screen ">
    <div className="border border-gray-300 bg-white shadow-2xl rounded-2xl p-6 w-full mx-auto relative transition-all duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.15)]">
      
        <div className="w-full">
          <HighchartsReact
      highcharts={Highcharts}
      constructorType={"stockChart"}
      options={chartOptions}
      ref={chartRef}
    />
       
      </div>
    </div>
  </div>

    
  );
};

export default CryptoChart;




// import { useEffect, useState } from "react";

// const BinanceWebSocket = () => {
//   const [price, setPrice] = useState(null);

//   useEffect(() => {
//     const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@kline_1s");

//     ws.onopen = () => console.log("✅ Connected to Binance WebSocket");

//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//      // console.log(data);
//       setPrice(data.k.c); // Closing price
//     };

//     ws.onerror = (error) => console.error("❌ WebSocket Error:", error);

//     ws.onclose = () => console.log("❌ Disconnected from WebSocket");

//     return () => ws.close();
//   }, []);

//   return (
//     <div className="p-4 border rounded-md shadow-md bg-white">
//       <h2 className="text-lg font-semibold">BTC/USDT Price</h2>
//       {price ? <p className="text-xl font-bold">{price} USDT</p> : <p>Loading...</p>}
//     </div>
//   );
// };

// export default BinanceWebSocket;
