


'use client'
import React, { useContext, useEffect, useState } from 'react'
import { CoinContext } from '@/context/CoinContext'
import Image from 'next/image'

interface Coin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  market_cap_rank: number;
  image: string
  market_cap_change_24h: string
  current_price: number
}


const Home = () => {

  const context = useContext(CoinContext);
  if (!context) {
    throw new Error("Navbar must be used within a CoinProvider");
  }
  const { allCoin, currency } = context;
  const [displayCoin, setDisplayCoin] = useState<Coin[]>([])


  useEffect(() => {
  
    setDisplayCoin(allCoin);


  }, [allCoin])
  


  return (
    <div className='flex items-center text-center justify-center py-[0px] px-[10px] pb-[100px]'>
        <div className='flex flex-col items-center text-center justify-center gap-8 max-w-xl m-[80px]'>
          <h1 className='text-[30px] font-extrabold'>Largest <br /> Crypto Marketplace</h1>
          <p className='text-customGray line-'>Welcome to the world&apos;s largest cryptocurrency marketplace. Sign up to explore more about cryptos.</p>
          <form className='flex p-[8px] w-[80%] bg-white rounded font-[20px] justify-between items-center gap-3'>
          <input type="text" placeholder='Search crypto..' className='flex-1 text-black outline-none border-none pl-3 font-[16px]' />
          <button type='submit' className='font-semibold rounded border-none bg-customPurple p-[4px]'>Search</button>
          </form>
          <div className='max-w-3xl bg-customPurple2 rounded m-auto'>
            <div className='grid grid-cols-5 gap-2 py-[15px] px-[20px] items-center border-b'>
                <p className='text-left'>#</p>
                <p className=''>Coins</p>
                <p className=''>Price</p>
                <p className='text-center'>24h Change</p>
                <p className='text-right'>Market Cap</p>
            </div>
            {
              displayCoin.slice(0,10).map((e,index) => (
                  <div className='grid grid-cols-5 gap-2 py-[15px] px-[20px] items-center border-b' key={index}>
                    <p>{e.market_cap_rank}</p>
                    <div>
                      <Image src={e.image} alt={e.id} width={22} height={22}/>
                      <p>{e.name + ' - ' + e.symbol}</p>
                      </div>
                    <p>{currency.Symbol} {e.current_price}</p>
                    <p>{e.market_cap_change_24h
                    }</p>
                    <p>{console.log(e)}</p>
                  </div>  
                  
              ))
              
            }
          </div>
          </div>
    </div>
  )
}

export default Home
