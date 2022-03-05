import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { isDarkAtom } from "./atom";
import { useRecoilValue } from "recoil";
interface ChartProps {
  coinId?: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

export default function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 10000 }
  );
  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Series1",
              data: data?.map((price) => {
                return {
                  x: price.time_open,
                  y: [
                    price.open.toFixed(3),
                    price.high.toFixed(3),
                    price.low.toFixed(3),
                    price.close.toFixed(3),
                  ],
                };
              }),
            },
          ]}
          options={{
            theme: { mode: isDark ? "dark" : "light" },
            title: {
              text: "CandleStick Chart",
              align: "left",
            },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              show: false,
              tooltip: {
                enabled: true,
              },
            },
          }}
        ></ApexChart>
      )}
    </>
  );
}
