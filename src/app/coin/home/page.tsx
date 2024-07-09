'use client'
import React, { useContext, useEffect, useState } from 'react'
import { CoinContext } from '@/context/CoinContext'
import Image from 'next/image'
import { Coin } from '@/context/CoinContext'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const Home: React.FC = () => {
  const context = useContext(CoinContext);
  if (!context) {
    throw new Error("Navbar must be used within a CoinProvider");
  }
  const { allCoin, currency } = context;
  const [displayCoin, setDisplayCoin] = useState<Coin[]>([])
  const [input, setInput] = useState('')

  const inputHandle = (e: any) => {
    setInput(e.target.value)
  }

  const searchHandle = (e: any) => {
    e.preventDefault()
    const coin = allCoin.find((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase())
    })
    setDisplayCoin(coin ? [coin] : [])
  }

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin])  


  const {id} = useParams()
  console.log(id)


  return (
    <div className='flex items-center text-center justify-center py-[0px] px-[10px] pb-[100px]'>
      <div className='flex flex-col items-center text-center justify-center gap-8 max-w-xl m-[80px]'>
        <h1 className='text-[30px] font-extrabold'>Largest <br /> Crypto Marketplace</h1>
        <p className='text-customGray line-'>Welcome to the world&apos;s largest cryptocurrency marketplace. Sign up to explore more about cryptos.</p>
        <form onSubmit={searchHandle} className='flex p-[8px] w-[80%] bg-white rounded font-[20px] justify-between items-center gap-3'>
          <input onChange={inputHandle} value={input} list='coinlist' type="text" placeholder='Search crypto..' className='flex-1 text-black outline-none border-none pl-3 font-[16px]' required />
          <datalist id='coinlist'>
            {allCoin.map((e, index) => (
              <option key={index} value={e.name} />
            ))}
          </datalist>
          <button type='submit' className='font-semibold rounded border-none bg-customPurple p-[4px]'>Search</button>
        </form>
        <div className='max-w-full bg-customPurple2 rounded'>
          <div className='grid grid-cols-5 gap-2 py-[15px] px-[20px] items-center border-b'>
            <p className='text-left'>#</p>
            <p className=''>Coins</p>
            <p className=''>Price</p>
            <p className='text-center'>24h Change</p>
            <p className='text-right'>Market Cap</p>
          </div>
          {displayCoin.slice(0, 10).map((e, index) => (
            <Link key={index} href={`/coin/${e.id}`}>
              <div key={index} className='grid grid-custom gap-2 py-[15px] items-center border-b cursor-pointer'>
                <p>{e.market_cap_rank}</p>
                <div className='flex items-center gap-3'>
                  <Image src={e.image} alt={e.id} width={22} height={22} />
                  <p>{e.name + ' - ' + e.symbol}</p>
                </div>
                <p>{currency.Symbol} {e.current_price.toLocaleString()}</p>
                <p className={e.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}>{Math.floor(e.price_change_percentage_24h * 100) / 100}</p>
                <p>{currency.Symbol} {e.market_cap.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
