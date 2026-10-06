import React from 'react'
import { IoHomeOutline, IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import { RiLogoutBoxRLine } from "react-icons/ri";
import Profile from '../assets/profile.jpg'
import Image from './Image'




const Sideber = () => {
  return (
    <div className='flex flex-col justify-around items-center w-[85%] mx-auto h-[93vh] bg-[#5F35F5] rounded-[20px] mt-8'>


      <div className='w-23 h-23 rounded-full'>
        <Image className='rounded-full' src={Profile}/>
      </div>
      <div className='flex flex-col gap-y-12'>
        <IoHomeOutline className='text-5xl text-white' />
        <AiFillMessage className='text-5xl text-white' />
        <IoSettingsOutline className='text-5xl text-white' />
        <IoNotificationsOutline className='text-5xl text-white' />
      </div>
        <RiLogoutBoxRLine className='text-5xl text-white' />




    </div>
  )
}

export default Sideber