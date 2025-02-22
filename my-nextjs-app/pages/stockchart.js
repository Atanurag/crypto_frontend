"use client";

import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { useState } from "react";

const CandleChart = ({ chartData ,loading,cryptoName}) => {
  console.log(chartData, "pp");

  const chartOptions = {
    title: { text:cryptoName },
    chart: { height: 600 },
    xAxis: { type: "datetime" },
    yAxis: [
      {
        title: { text: "Price" },
        height: "70%",
        lineWidth: 2,
      },
      {
        title: { text: "Volume" },
        top: "75%",
        height: "25%",
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
        name: 'Data',
        lastPrice: {
            enabled: true,
            label: {
                enabled: true,
                backgroundColor: 'orange'
            }
        },
        color: 'red',
          upColor: 'green',
        data: chartData.map(([time, open, high, low, close]) => [
          time,
          parseFloat(open),
          parseFloat(high),
          parseFloat(low),
          parseFloat(close),
        ]),
      },
      {
        type: "column",
        name: "Volume",
        data: chartData.map(([time, , , , , volume]) => [
          time,
          parseFloat(volume),
        ]),
        yAxis: 1,
        color: "blue",
        opacity: 0.5,
      },
    ],
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
    <div className="border border-gray-300 bg-white shadow-2xl rounded-2xl p-6 w-full mx-auto relative transition-all duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.15)]">
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <span className="text-gray-700 text-lg font-semibold animate-pulse">
            Loading...
          </span>
        </div>
      ) : (
        <div className="w-full">
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={"stockChart"}
            options={chartOptions}
          />
        </div>
      )}
    </div>
  </div>
  
  );
};

export default CandleChart;
