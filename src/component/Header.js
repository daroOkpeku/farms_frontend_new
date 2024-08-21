import React from 'react'
import Image from 'next/image'
import { CiSearch } from "react-icons/ci";
import { GoBell } from "react-icons/go";
import Logo from "../image/Logo.png";
import { IoIosMenu } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
export default function Header({ showing, isSidebarShowing}) {
    return (
        <div className='w-full flex flex-row items-center justify-between px-4 border bg-white'>
            <span className='w-20 h-16'>
                <Image src={Logo} alt='logo' className='w-full h-full' />
            </span>

            <div className='w-3/5 relative'>
             <input type="text" className='w-full h-full p-2 px-7 outline-none ' placeholder='Search...' />
               <CiSearch className='absolute top-3 left-1  font-semibold text-lg '/>
            </div>

            <div className='w-10 h-10 relative grid place-content-center bg-[#EBEBEB] rounded-md  '>
                 <GoBell className='w-6 h-6 text-[#898A8D]'/>
                 <span className='w-2 h-2 bg-[#FF0000]  rounded-full absolute top-2  right-2 '></span>
            </div>
            <div className='lg:hidden block'onClick={showing}>
                {isSidebarShowing ? <IoIosClose fontSize={"40px"}/> : <IoIosMenu fontSize={"40px"} /> }
            
            </div>
        </div>
    )
}
