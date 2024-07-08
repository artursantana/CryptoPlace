'use client'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react';
import { CoinContext, Coin } from '@/context/CoinContext';
import Image from 'next/image';

const Page: React.FC = () => {
  const context = useContext(CoinContext);
  if (!context) {
    throw new Error("Page must be used within a CoinProvider");
  }

  const { allCoin } = context;
  const { id } = useParams();

  console.log(allCoin)

  

  const [product, setProduct] = useState<Coin>();
  
  
  const FindHandle = () => {
    
    if (id && allCoin.length > 0) {
      const foundCoin = allCoin.find((e) => e.id === id)
      console.log(id)
      
      setProduct(foundCoin);
      
    }
  }
  
  FindHandle()

  

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

export default Page;
