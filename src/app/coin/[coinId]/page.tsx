'use client'
import React, { useContext, useEffect, useState } from 'react';
import { CoinContext, Coin } from '@/context/CoinContext';
import Image from 'next/image';

interface PageProps {
  params: { coinId: string }
}

const CoinPage = ({ params }: PageProps) => {
  const { coinId } = params;
  const context = useContext(CoinContext);

  if (!context) {
    throw new Error("CoinPage must be used within a CoinProvider");
  }

  
  const { allCoin } = context;
  const [product, setProduct] = useState<Coin | null>(null);
  console.log(product)

  useEffect(() => {
    if (coinId && allCoin.length > 0) {
      const foundCoin = allCoin.find((e) => e.id === coinId);
      setProduct(foundCoin || null);
    }
  }, [coinId, allCoin]);

  console.log(coinId)
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name} ({product.symbol})</h1>
      <Image src={product.image} alt={product.name} width={50} height={50} />
      <p>Current Price: {product.current_price}</p>
      <p>Market Cap: {product.market_cap}</p>
      <p>24h Change: {product.price_change_percentage_24h}%</p>
    </div>
  );
};

export default CoinPage;
