// import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Routes, Route, useMatch, Link } from "react-router-dom";
import { fetchCoinPrice, fetchCoinInfo } from "./api";
import { useQuery } from "react-query";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import Chart from "./routes/Chart";
import Price from "./routes/Price";

interface RouteParams {
  coinId: string;
}

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
`;
const Title = styled.h1`
  font-size: 38px;
  color: ${(props) => props.theme.accentColor};
`;
const HomeBtn = styled.div`
  position: absolute;
  left: 10px;

  a {
    color: inherit;
    &:hover {
      color: #e2d06b;
      animation: 1s ease-in;
    }
  }
`;
const Loader = styled.span`
  text-align: center;
  display: block;
  margin: auto;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 25px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;
interface RouterState {
  name: string;
}
interface IinfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
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
interface ICoinProps {
  isDark: boolean;
}
function Coin() {
  const { coinId } = useParams();
  // const [loading, setLoading] = useState(true);
  const location = useLocation();
  const state = location.state as RouterState;
  // const [info, setInfo] = useState<IinfoData>();
  // const [price, setPrice] = useState<IpriceData>();
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: coinData } = useQuery<IinfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId),
    { refetchInterval: 5000 }
  );
  const { isLoading: priceLoading, data: coinPrice } = useQuery<IpriceData>(
    ["price", coinId],
    () => fetchCoinPrice(coinId)
  );
  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();
  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     setInfo(infoData);
  //     setPrice(priceData);
  //     setLoading(false);
  //   })();
  // }, [coinId]);
  return (
    <>
      <Container>
        <HelmetProvider>
          <Helmet>
            <title>
              {state?.name
                ? state.name
                : infoLoading
                ? "Loading..."
                : coinData?.name}
            </title>
          </Helmet>
        </HelmetProvider>
        <Header>
          <HomeBtn>
            <Link to={"/"}>
              <FontAwesomeIcon icon={faHouse} size={"2x"}></FontAwesomeIcon>
            </Link>
          </HomeBtn>
          <Title>
            {state?.name
              ? state.name
              : infoLoading
              ? "Loading..."
              : coinData?.name}
          </Title>
        </Header>
        {infoLoading || priceLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            <Overview>
              <OverviewItem>
                <span>Rank:</span>
                <span>{coinData?.rank}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Symbol:</span>
                <span>${coinData?.symbol}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Price:</span>
                <span>{coinPrice?.quotes.USD.price}</span>
              </OverviewItem>
            </Overview>
            <Description>{coinData?.description}</Description>
            <Overview>
              <OverviewItem>
                <span>Total Suply:</span>
                <span>{coinPrice?.total_supply}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Max Supply:</span>
                <span>{coinPrice?.max_supply}</span>
              </OverviewItem>
            </Overview>
            <Tabs>
              <Tab isActive={chartMatch !== null}>
                <Link to={`/${coinId}/chart`}>Chart</Link>
              </Tab>
              <Tab isActive={priceMatch !== null}>
                <Link to={`/${coinId}/price`}>Price</Link>
              </Tab>
            </Tabs>
          </>
        )}

        <Routes>
          <Route path="chart" element={<Chart coinId={coinId} />}></Route>
          <Route path="price" element={<Price coinId={coinId} />}></Route>
        </Routes>
      </Container>
    </>
  );
}
export default Coin;
