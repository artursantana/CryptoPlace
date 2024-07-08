
"use client";
import { createContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface Currency {
  name: string;
  Symbol: string;
}

export interface Coin {
  symbol: string;
  id: string;
  name: string;
  price: number;
  market_cap_rank: number;
  image: string
  market_cap_change_24h: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
}

interface CoinContextType {
  allCoin: Coin[];
  currency: Currency;
  setCurrency: Dispatch<SetStateAction<Currency>>;
}

export const CoinContext = createContext<CoinContextType | undefined>(undefined);

interface CoinContextProviderProps {
  children: ReactNode;
}

const CoinContextProvider: React.FC<CoinContextProviderProps> = ({ children }) => {
  const [allCoin, setAllCoin] = useState<Coin[]>([]);
  const [currency, setCurrency] = useState<Currency>({
    name: 'usd',
    Symbol: '$'
  });

  const fetchAllCoin = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-KXyRHErFBJaPaxeaexzKFShD' }
    };

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options);
      const data = await response.json();
      setAllCoin(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllCoin();
  }, []);

  const contextValue: CoinContextType = {
    allCoin,
    currency,
    setCurrency
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
