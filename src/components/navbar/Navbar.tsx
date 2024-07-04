
'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


const Navbar = () => {
  return (
    <div className='flex items-center justify-between py-[20px] px-[10%] border-b-2 border-solid  border-customDark text-customGray'>
      <Image className='max-width:12vw' src='/assets/logo.png' width={220} height={150} alt='logo'/>
      <ul className='flex gap-40 list-none'>
        <li className='cursor-pointer'><Link href='/home'>Home</Link></li>
        <li className='cursor-pointer'>Features</li>
        <li className='cursor-pointer'>Pricing</li>
        <li className='cursor-pointer'>Blog</li>
      </ul>
      <div className='flex items-center justify-center gap-2'>
        <select className=' py-[5px] px-[8px] text-white bg-transparent border-solid border-white border-2 rounded'>
            <option className='bg-customDarkBlue text-white' value="usd">USD</option>
            <option className='bg-customDarkBlue text-white' value="eur">EUR</option>
            <option className='bg-customDarkBlue text-white' value="brl">R$</option>
        </select>
        <button className='flex text-center gap-5 py-[10px] px-[25px] bg-gray-100 items-center justify-center rounded font-bold '>Sign up <Image className='' src='/assets/arrow_icon.png' width={13} height={13} alt='arrow'/></button>
      </div>
    </div>
  )
}

export default Navbar
