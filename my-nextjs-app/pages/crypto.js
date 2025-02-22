import { useEffect, useState, useRef } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

const WsChart = ({ cryptoName }) => {
  const [chartData, setChartData] = useState([]);
  const chartRef = useRef(null); // Reference to Highcharts instance

  useEffect(() => {
    const ws = new WebSocket("wss://7bdf105a-eaa2-4b52-8ca2-002d0e451b9c-00-wyq97l12pmk8.pike.replit.dev:3000/"); // change this url by server wss endpoint
    ws.onmessage = (event) => {
        try {
         // console.log("📩 Raw WebSocket Message:", event.data); // Debugging purpose
          const data = JSON.parse(event.data);
      
          if (data.k) {
            const { t, o, h, l, c, v } = data.k; // Extract relevant fields which we need to show
      
            if (!t || !o || !h || !l || !c || !v) {
              return; // Ignore incomplete messages if no data
            }
      
          

            const newCandle = [
              t, // Timestamp
              parseFloat(o), // Open
              parseFloat(h), // High
              parseFloat(l), // Low
              parseFloat(c), // Close
             
            ];
            
      
            setChartData((prevData) => {
              const updatedData = [...prevData.slice(-99), newCandle];
              return updatedData;
            });
      
            // Update chart dynamically
            if (chartRef.current) {
              const series = chartRef.current.chart.series[0];
              series.addPoint(newCandle, true, series.data.length >= 100);
            }
          }
        } catch (error) {
          console.warn("Error parsing WebSocket message:", event.data);
        }
      };
      

    return () => ws.close();
  }, []);

  const chartOptions = {
    title: { text: 'Binance Spot ' },
    chart: { height: 600 },
    xAxis: { type: "datetime" },
    yAxis: [
      {
        title: { text: "Price" },
        height: "70%", // Price chart occupies 70%
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
        data: chartData.map((candle) => [candle[0], candle[1], candle[2], candle[3], candle[4]]),
      },
    //   {
    //     type: "column", // Bar chart for volume
    //     name: "Volume",
    //     yAxis: 1, // Assign volume to the second y-axis
    //     data: chartData.map((candle) => [candle[0], candle[5]]), // Volume data
    //     color: "#7cb5ec", // Volume bars color
    //   },
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

export default WsChart;
