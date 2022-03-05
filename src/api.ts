const BASE_URL = "https://api.coinpaprika.com/v1";

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinPrice(coinId?: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinInfo(coinId?: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinHistory(coinId?: string) {
  const endData = Math.ceil(Date.now() / 1000);
  const startData = endData - 60 * 60 * 24 * 7;
  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startData}&end=${endData}`
  ).then((response) => response.json());
}
