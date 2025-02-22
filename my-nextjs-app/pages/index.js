import Head from "next/head";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const CandleChart = dynamic(() => import("./stockchart.js"), { ssr: false });
const WsChart = dynamic(() => import("./crypto.js"), { ssr: false });

const Home = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const [cryptoType, setCryptoType] = useState("binance-spot");

  const [intervalValue, setIntervalValue] = useState("1s");
  const [limitNumber, setLimitNumber] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [getLive, setGetLive] = useState(false);
  const mexcFuturesColDef = [
    { key: "time", label: "Time" },
    { key: "open", label: "Open" },
    { key: "high", label: "High" },
    { key: "low", label: "Low" },
    { key: "close", label: "Close" },
    { key: "vol", label: "Volume" },
  ];

  const kuCoinColDef = [
    { key: "time", label: "Time" },
    { key: "open", label: "Open" },
    { key: "close", label: "Close" },
    { key: "high", label: "High" },
    { key: "low", label: "Low" },
    { key: "vol", label: "Volume" },
  ];

  const applyFilter = async (e) => {
    setLoading(true);
    try {
      if (cryptoType == "binance-spot") {
        let url = `https://7bdf105a-eaa2-4b52-8ca2-002d0e451b9c-00-wyq97l12pmk8.pike.replit.dev/binance-spot-data?interval=${intervalValue}&limit=${limitNumber}`;
        let fetched = await fetch(url);
        let json = await fetched.json();
        let data = await json;

        setData(data);

        setLoading(false);
      }
      if (cryptoType == "binance-futures") {
        let url = `https://7bdf105a-eaa2-4b52-8ca2-002d0e451b9c-00-wyq97l12pmk8.pike.replit.dev/binance-futures-data?interval=${intervalValue}&limit=${limitNumber}`;
        let fetched = await fetch(url);
        let json = await fetched.json();
        let data = await json;

        setData(data);
        setLoading(false);
      }

      if (cryptoType == "mexc-spot") {
        let url = `https://7bdf105a-eaa2-4b52-8ca2-002d0e451b9c-00-wyq97l12pmk8.pike.replit.dev/mexc-spot-data?interval=${intervalValue}&limit=${limitNumber}`;
        let fetched = await fetch(url);
        let json = await fetched.json();
        let data = await json;

        setData(data);
        setLoading(false);
      }

      if (cryptoType == "mexc-futures") {
        let url = `https://7bdf105a-eaa2-4b52-8ca2-002d0e451b9c-00-wyq97l12pmk8.pike.replit.dev/mexc-futures-data?interval=${intervalValue}&start=${toUnixTimestamp(startDate)}&end=${toUnixTimestamp(endDate)}`;
        let fetched = await fetch(url);
        let json = await fetched.json();
        let data = await json;

        const transformedData = data.data.time.map((timestamp, index) => {
          const endTime = (timestamp + 3600) * 1000 - 1; // Assuming 1 hour interval

          return [
            timestamp * 1000,
            data.data.open[index].toFixed(8),
            data.data.high[index].toFixed(8),
            data.data.low[index].toFixed(8),
            data.data.close[index].toFixed(8),
            data.data.vol[index].toFixed(8),
            data.data.amount[index].toFixed(8),
            data.data.realOpen[index].toFixed(8),
            data.data.realClose[index].toFixed(8),
            data.data.realHigh[index].toFixed(8),
            data.data.realLow[index].toFixed(8),
          ];
        });


        setData(transformedData);
        setLoading(false);
      }

      if (cryptoType == "kucoin-spot") {
        let url = `https://7bdf105a-eaa2-4b52-8ca2-002d0e451b9c-00-wyq97l12pmk8.pike.replit.dev/kucoin-spot-data?interval=${intervalValue}&start=${toUnixTimestamp(startDate)}&end=${toUnixTimestamp(endDate)}`;
        let fetched = await fetch(url);
        let json = await fetched.json();
        let data = await json;
        console.log(data.data);
        setData(data.data);
        setLoading(false);
      }

      if (cryptoType == "kucoin-futures") {
        let url = `https://7bdf105a-eaa2-4b52-8ca2-002d0e451b9c-00-wyq97l12pmk8.pike.replit.dev/kucoin-futures-data?interval=${intervalValue}&start=${toUnixMiliseconds(startDate)}&end=${toUnixMiliseconds(endDate)}`;
        let fetched = await fetch(url);
        let json = await fetched.json();
        let data = await json;
        console.log(data.data);
        setData(data.data);
        setLoading(false);
      }
      if (cryptoType == "bybit-spot") {
        let url = `https://7bdf105a-eaa2-4b52-8ca2-002d0e451b9c-00-wyq97l12pmk8.pike.replit.dev/bybit-spot-data?interval=${intervalValue}&start=${toUnixMiliseconds(startDate)}&end=${toUnixMiliseconds(endDate)}`;
        let fetched = await fetch(url);
        let json = await fetched.json();
        let data = await json;
        console.log(data.result.list);
        setData(data.result.list);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const binanceSpotInterval = [
    { value: "1s", label: "1 second" },
    { value: "1m", label: "1 minute" },
    { value: "3m", label: "3 minutes" },
    { value: "5m", label: "5 minutes" },
    { value: "15m", label: "15 minutes" },
    { value: "30m", label: "30 minutes" },
    { value: "1h", label: "1 hour" },
    { value: "2h", label: "2 hours" },
    { value: "4h", label: "4 hours" },
    { value: "6h", label: "6 hours" },
    { value: "8h", label: "8 hours" },
    { value: "12h", label: "12 hours" },
    { value: "1d", label: "1 day" },
    { value: "3d", label: "3 days" },
    { value: "1w", label: "1 week" },
    { value: "1M", label: "1 month" },
  ];

  const mexcSpotInterval = [
    { value: "1m", label: "1 minute" },
    { value: "5m", label: "5 minutes" },
    { value: "15m", label: "15 minutes" },
    { value: "30m", label: "30 minutes" },
    { value: "60m", label: "60 minutes" },
    { value: "4h", label: "4 hours" },
    { value: "1d", label: "1 day" },
    { value: "1W", label: "1 week" },
    { value: "1M", label: "1 month" },
  ];
  const mexcFuturesInterval = [
    { value: "Min1", label: "1 minute" },
    { value: "Min5", label: "5 minutes" },
    { value: "Min15", label: "15 minutes" },
    { value: "Min30", label: "30 minutes" },
    { value: "Min60", label: "60 minutes" },
    { value: "Hour4", label: "4 hours" },
    { value: "Hour8", label: "8 hours" },
    { value: "Day1", label: "1 day" },
    { value: "Week1", label: "1 week" },
    { value: "Month1", label: "1 month" },
  ];
  const kuCoinSpotInterval = [
    { value: "1min", label: "1 minute" },
    { value: "3min", label: "3 minutes" },
    { value: "5min", label: "5 minutes" },
    { value: "15min", label: "15 minutes" },
    { value: "30min", label: "30 minutes" },
    { value: "1hour", label: "1 hour" },
    { value: "2hour", label: "2 hours" },
    { value: "4hour", label: "4 hours" },
    { value: "6hour", label: "6 hours" },
    { value: "8hour", label: "8 hours" },
    { value: "12hour", label: "12 hours" },
    { value: "1day", label: "1 day" },
    { value: "1week", label: "1 week" },
    { value: "1month", label: "1 month" },
  ];
  const kuCoinFuturesInterval = [
    { value: "1", label: "1 minute" },
    { value: "5", label: "5 minutes" },
    { value: "15", label: "15 minutes" },
    { value: "30", label: "30 minutes" },
    { value: "60", label: "60 minutes" },
    { value: "120", label: "2 hours" },
    { value: "240", label: "4 hours" },
    { value: "480", label: "8 hours" },
    { value: "720", label: "12 hours" },
    { value: "1440", label: "1 day" },
    { value: "10080", label: "1 week" },
  ];

  const bybitSpotInterval = [
    { value: "1", label: "1 minute" },
    { value: "3", label: "3 minutes" },
    { value: "5", label: "5 minutes" },
    { value: "15", label: "15 minutes" },
    { value: "30", label: "30 minutes" },
    { value: "60", label: "60 minutes" },
    { value: "120", label: "2 hours" },
    { value: "240", label: "4 hours" },
    { value: "360", label: "6 hours" },
    { value: "720", label: "12 hours" },
    { value: "D", label: "1 day" },
    { value: "M", label: "1 month" },
    { value: "W", label: "1 week" },
  ];

  // Function to convert date string to timestamp
  function toUnixTimestamp(dateStr) {
    const date = new Date(dateStr);
    return Math.floor(date.getTime() / 1000); // Convert milliseconds to seconds
  }
  function toUnixMiliseconds(dateStr) {
    const date = new Date(dateStr);
    return Math.floor(date.getTime()); // Convert milliseconds to seconds
  }
  useEffect(() => {
    //console.log(cryptoType);
  }, [cryptoType]);

  return (
    <div className="min-h-screen p-8">

      <main className="w-full">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          📊 Crypto Market Data
        </h1>
        <p className="text-lg text-gray-600 text-center mb-6">
          Real-time insights and analytics for various cryptocurrency markets.
        </p>


        {/* Filter section*/}

        <div className=" m-5 w-full max-w-[1200px] mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl flex flex-wrap items-center gap-6 border border-gray-200 dark:border-gray-700">
          {/* Select Crypto Dropdown */}
          <div className="w-[250px]">
            <label htmlFor="crypto-select" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Select Crypto
            </label>
            <select
              id="crypto-select"
              className="w-full p-2 border rounded-lg text-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              onChange={(e) => {
                setCryptoType(e.target.value);
                setData([]);
                setLimitNumber(0);
              }}
            >
              <option value="" disabled selected>
                Choose a Crypto
              </option>
              <option key="binance-spot" value="binance-spot">Binance Spot</option>
              <option key="binance-futures" value="binance-futures">Binance Futures</option>
              <option key="mexc-spot" value="mexc-spot">MEXC Spot</option>
              <option key="mexc-futures" value="mexc-futures">MEXC Futures</option>
              <option key="kucoin-spot" value="kucoin-spot">KuCoin Spot</option>
              <option key="kucoin-futures" value="kucoin-futures">KuCoin Futures</option>
              <option key="bybit-spot" value="bybit-spot">Bybit Spot</option>
            </select>
          </div>

          {/* Date Pickers (Only for specific cryptos) */}
          {(cryptoType === "mexc-futures" || cryptoType === "kucoin-spot" || cryptoType === "kucoin-futures" || cryptoType == "bybit-spot") && (
            <div className="flex items-center gap-4">
              <div className="w-[200px]">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Start Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 border rounded-lg text-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="w-[200px]">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  End Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-2 border rounded-lg text-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
          )}

          {/* Time Interval Selection */}
          {cryptoType && cryptoType !== "" && (
            <div className="w-[250px]">
              <label htmlFor="time-intervals" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Select a Time Interval
              </label>
              <select
                id="time-intervals"
                className="w-full p-2 border rounded-lg text-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                onChange={(e) => setIntervalValue(e.target.value)}
              >
                <option value="" disabled selected>
                  Choose a Time Interval
                </option>
                {cryptoType === "mexc-futures"
                  ? mexcFuturesInterval.map((interval) => (
                    <option key={interval.value} value={interval.value}>
                      {interval.label}
                    </option>
                  ))
                  : cryptoType === "mexc-spot"
                    ? mexcSpotInterval.map((interval) => (
                      <option key={interval.value} value={interval.value}>
                        {interval.label}
                      </option>
                    ))
                    : cryptoType === "binance-spot" || cryptoType === "binance-futures"
                      ? binanceSpotInterval.map((interval) => (
                        <option key={interval.value} value={interval.value}>
                          {interval.label}
                        </option>
                      ))
                      : cryptoType === "kucoin-spot"
                        ? kuCoinSpotInterval.map((interval) => (
                          <option key={interval.value} value={interval.value}>
                            {interval.label}
                          </option>
                        ))
                        : cryptoType === "kucoin-futures"
                          ? kuCoinFuturesInterval.map((interval) => (
                            <option key={interval.value} value={interval.value}>
                              {interval.label}
                            </option>
                          ))
                          : cryptoType === "bybit-spot"
                            ? bybitSpotInterval.map((interval) => (
                              <option key={interval.value} value={interval.value}>
                                {interval.label}
                              </option>
                            ))
                            : []}
              </select>
            </div>
          )}

          {/* Limit Input Field */}
          {(cryptoType === "binance-spot" || cryptoType === "binance-futures" || cryptoType === "mexc-spot") && (
            <div className="w-[200px]">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Enter a Limit
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg text-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="4"
                value={limitNumber}
                onChange={(e) => setLimitNumber(e.target.value)}
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-md self-end"
            onClick={() => applyFilter()}
          >
            Submit
          </button>
        </div>


        <div className="bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-4 border-b border-gray-300">
            <h2 className="text-lg font-semibold text-gray-700 uppercase tracking-wide">
              {cryptoType.replace('-', ' ').toUpperCase()} Data
            </h2>
          </div>

          {/* Crypto Grid section*/}
          <div className="overflow-x-auto">
            {data.length !== 0 ? (
              <table className="w-full table-auto border-collapse">
                <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700">
                  <tr className="border-b border-gray-300">
                    {cryptoType == "mexc-futures"
                      ? mexcFuturesColDef.map(({ key, label }) => (
                        <th
                          key={key}
                          className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide border-r last:border-r-0"
                        >
                          {label}
                        </th>
                      ))
                      : cryptoType == "kucoin-spot"
                        ? kuCoinColDef.map(({ key, label }) => (
                          <th
                            key={key}
                            className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide border-r last:border-r-0"
                          >
                            {label}
                          </th>
                        ))
                        : [
                          "Time",
                          "Open",
                          "High",
                          "Low",
                          "Close",
                          "Volume",
                          ...(cryptoType != "binance-spot" &&
                            cryptoType != "mexc-spot" &&
                            cryptoType != "mexc-futures" &&
                            cryptoType != "kucoin-futures" &&
                            cryptoType != "bybit-spot"
                            ? ["Quote Volume", "Trades", "Taker Buy Vol", "Taker Buy Quote Vol"]
                            : []),
                        ].map((label, index) => (
                          <th
                            key={index}
                            className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide border-r last:border-r-0"
                          >
                            {label}
                          </th>
                        ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-700">



                  {data
                    ?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
                    .map((row, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-all duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap border-r last:border-r-0">
                          {cryptoType == "kucoin-spot" || cryptoType == "bybit-spot"
                            ? new Date(row[0] * 1000).toLocaleString()
                            : new Date(row[0]).toLocaleString()}
                        </td>
                        {row.slice(1, 6).map((value, i) => (
                          <td
                            key={i}
                            className="px-6 py-4 whitespace-nowrap border-r last:border-r-0"
                          >
                            {parseFloat(value).toFixed(2)}
                          </td>
                        ))}
                        {cryptoType == "kucoin-spot" || cryptoType == "binance-futures" ? (
                          <>
                            {row.slice(7, 11).map((value, i) => (
                              <td
                                key={i}
                                className="px-6 py-4 whitespace-nowrap border-r last:border-r-0"
                              >
                                {parseFloat(value).toFixed(2)}
                              </td>
                            ))}
                          </>
                        ) : null}
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-center text-gray-500">No Data</p>
              </div>
            )}
          </div>
        </div>


        {data.length > 5 && (
          <div
            style={{ zIndex: 999999 }}
            className=" mt-4 flex justify-center items-center space-x-4"
          >
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 border rounded ${currentPage === 1
                  ? "bg-gray-100 text-gray-400"
                  : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
            >
              Prev
            </button>
            <span className="px-4 py-2 border rounded bg-blue-500 text-white">
              {currentPage + "/" + parseInt(data.length / 5)}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(Math.ceil(data.length / rowsPerPage), prev + 1),
                )
              }
              disabled={currentPage === Math.ceil(data.length / rowsPerPage)}
              className={`px-4 py-2 border rounded ${currentPage === Math.ceil(data.length / rowsPerPage)
                  ? "bg-gray-100 text-gray-400"
                  : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
            >
              Next
            </button>
          </div>
        )}

        {data.length != 0 && (
          <CandleChart
            cryptoName={cryptoType.replace('-', ' ').toUpperCase()}
            chartData={data.map((subArray) => subArray.slice(0, 6))}
            loading={loading}
          />
        )}

        {/* Websocket section*/}
        <button
          className="m-[10px] bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-md self-end"
          onClick={() => setGetLive((p) => !p)}
        >
          Get Binance WS
        </button>
        {getLive && <WsChart />}
      </main>
    </div>
  );
};

export default Home;
