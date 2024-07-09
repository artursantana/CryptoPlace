'use client'
import React, { useContext, useEffect, useState } from 'react';
import { CoinContext, Coin } from '@/context/CoinContext';
import Image from 'next/image';
import LineChart from '@/components/lineChart/LineChart';

interface PageProps {
  params: { coinId: string }
}

const CoinPage = ({ params }: PageProps) => {
  const { coinId } = params;
  const context = useContext(CoinContext);

  if (!context) {
    throw new Error("CoinPage must be used within a CoinProvider");
  }

  const { currency } = context
  
  const { allCoin } = context;
  const [product, setProduct] = useState<Coin | null>();
  const [historicalData, setHistoricalData] = useState<any>(null)
  

  useEffect(() => {
    if (coinId && allCoin.length > 0) {
      const foundCoin = allCoin.find((e) => e.id === coinId);
      setProduct(foundCoin || null);
    }
  }, [coinId, allCoin]);




  const fetchHistoricalData = async () => {
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency?.name}&days=10`, options)
      const data = await response.json();
      setHistoricalData(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (coinId) {
      fetchHistoricalData();
    }
  }, [coinId]);

console.log(product?.current_price)
console.log(product?.name)
console.log(product?.symbol)


  if (!product) {
    return <h1 className='font-extrabold'>Loading...</h1>;
  }
  else{
    return (
      <div className='flex flex-col w-[100%] justify-center text-center items-center m-1'>
      <h1>{product.name} ({product.symbol})</h1>
      <Image src={product.image} alt={product.name} width={160} height={100} />
      <div className='w-[600px]'>
      {historicalData && historicalData.prices ? (
        <LineChart historicalData={historicalData} />
      ) : (
        <p>Loading chart data...</p>
      )}
      </div>
      <div className='m-10'>
        <p className='w-96 flex border border-white'>Current Price: <span className='text-yellow-400'>{product.current_price}</span></p>
        <p className='w-96 flex border border-white'>Market Cap: {product.market_cap}</p>
        <p className='w-96 flex border border-white'>24h Change: <span className={product.price_change_percentage_24h <= 0 ? 'text-red-500' : 'text-green-500'}>{product.price_change_percentage_24h}%
        <span className='ml-2'>
              {product.price_change_percentage_24h <= 0 ? '🧻' : '🤑'}
            </span></span></p>
      </div>
      
    </div>
  );
};
}

export default CoinPage;
