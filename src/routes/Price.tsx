import ApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { fetchCoinPrice } from "../api";

interface ChartProps {
  coinId?: string;
}
interface IpriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

export default function Price({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IpriceData>(["percent", coinId], () =>
    fetchCoinPrice(coinId)
  );
  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <ApexChart
          type="bar"
          series={[
            {
              name: "Pecent Changes",
              data: [
                data?.quotes.USD.percent_change_15m,
                data?.quotes.USD.percent_change_30m,
                data?.quotes.USD.percent_change_1h,
                data?.quotes.USD.percent_change_6h,
                data?.quotes.USD.percent_change_24h,
                data?.quotes.USD.percent_change_30d,
                data?.quotes.USD.percent_change_1y,
              ],
            },
          ]}
          options={{
            theme: { mode: "dark" },
            title: {
              text: "Percent Changes Over Time",
            },
            plotOptions: {
              bar: {
                colors: {
                  ranges: [
                    {
                      from: -100,
                      to: 0,
                      color: "#F15B46",
                    },
                    {
                      from: 0,
                      to: 100,
                      color: "#FEB019",
                    },
                  ],
                },
                columnWidth: "80%",
              },
            },
            xaxis: {
              categories: ["15m", "30m", "1h", "6h", "24h", "30d", "1y"],
            },
          }}
        ></ApexChart>
      )}
    </>
  );
}
