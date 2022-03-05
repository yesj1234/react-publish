import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { fetchCoins } from "./api";
import { useQuery } from "react-query";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "./routes/atom";

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
`;

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
`;
const Loader = styled.span`
  text-align: center;
  display: block;
  margin: auto;
`;
const CoinList = styled.ul``;
const Coin = styled.li`
  margin-bottom: 10px;
  border-radius: 20px;
  a {
    color: inherit;
    transition: color 0.3s ease-in;
    display: flex;
    align-items: center;
    padding: 20px;
    img {
      margin-right: 10px;
    }
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
  color: ${(props) => props.theme.bgColor};
  background-color: ${(props) => props.theme.textColor};
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const setterFn = useSetRecoilState(isDarkAtom);
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>코인</title>
        </Helmet>
      </HelmetProvider>
      <Container>
        <Header>
          <Title>코인</Title>
          <button onClick={() => setterFn((prev) => !prev)}>Toggle Mode</button>
        </Header>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <CoinList>
            {data?.slice(0, 200).map((coin: ICoin) => {
              return (
                <Coin key={coin.id}>
                  <Link
                    to={`/${coin.id}`}
                    state={{ name: coin.name, rank: coin.rank }}
                  >
                    <Img
                      src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                    />
                    {coin.name} &rarr;
                  </Link>
                </Coin>
              );
            })}
          </CoinList>
        )}
      </Container>
    </>
  );
}
export default Coins;
