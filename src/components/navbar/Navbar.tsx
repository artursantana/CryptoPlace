
'use client'
import React, { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CoinContext } from '@/context/CoinContext'




const Navbar = () => {

  const context = useContext(CoinContext);
  if (!context) {
    throw new Error("Navbar must be used within a CoinProvider");
  }
  const { setCurrency } = context;


  const currencyhandle = (e: React.ChangeEvent<HTMLSelectElement>) => {
      switch (e.target.value) {
        case 'usd': {
          setCurrency({
            name: 'usd', Symbol: '$'
          })
            break
        }
        case 'eur': {
          setCurrency({
            name: 'eur', Symbol: '€'
          })
            break
        }
        case 'brl': {
          setCurrency({
            name: 'brl', Symbol: 'R$'
          })
            break
        }
        default: {
          setCurrency({
               name: 'usd', Symbol: '$'
          })
        }
          
      }
  }

  return (
    <div className='flex items-center justify-between py-[20px] px-[10%] border-b-2 border-solid  border-customDark text-customGray'>
      <Link href='/'>
          <Image className='max-width:12vw' src='/assets/logo.png' width={220} height={150} alt='logo'/>
      </Link>
      <ul className='flex gap-40 list-none'>
        <li className='cursor-pointer'><Link href='/coin/home'>Home</Link></li>
        <li className='cursor-pointer'>Features</li>
        <li className='cursor-pointer'>Pricing</li>
        <li className='cursor-pointer'>Blog</li>
      </ul>
      <div className='flex items-center justify-center gap-2'>
        <select onChange={currencyhandle} className=' py-[5px] px-[8px] text-white bg-transparent border-solid border-white border-2 rounded'>
            <option className='bg-customDarkBlue text-white' value="usd">USD</option>
            <option className='bg-customDarkBlue text-white' value="eur">EUR</option>
            <option className='bg-customDarkBlue text-white' value="brl">BRL</option>
        </select>
        <button className='flex text-center gap-5 py-[10px] px-[25px] bg-gray-100 items-center justify-center rounded font-bold '>Sign up <Image className='' src='/assets/arrow_icon.png' width={13} height={13} alt='arrow'/></button>
      </div>
    </div>
  )
}

export default Navbar
