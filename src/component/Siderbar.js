import React, { useState, useContext } from 'react'
import userimage from "../image/Ellipse 31.png"
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Image from 'next/image'
import Dash from "../image/dashboard.png"
import Animal from "../image/pet.png"
import group from "../image/group.png"
import record from "../image/record.png"
import finance from "../image/finance.png"
import settting from "../image/setting-2.png"
import proflie from "../image/Profile.png"
import feedmgt from "../image/feed_mgt.png"
import animalheath from '../image/animal_health.png'
import production from "../image/production.png"
import Link from 'next/link';
import { context } from './context';
import { useRouter } from 'next/router';
export default function Siderbar({ show }) {
const [istitle, Setistitle] = useState('dashboard')
const router = useRouter();

const created = useContext(context)
const {SetaddAnimal,  Setloadpop } = created


    const subMenu = [
        {
            image:Dash,
            title:"dashboard",
            link:"/"
        },
        {
            image:Animal,
            title:"animal",
            link:"/animals"
        },
        {
            image:feedmgt,
            title:"Feed Mgt",
            link:"/feed_mgt"
        },
        {
            image:record,
            title:"records",
            link:"/record"
        },
        {
            image:finance,
            title:"Finance",
            link:"/finance"
        }
    ]

    const subMenutwo = [
        {
            image:animalheath,
            title:"animal health",
             link:"/animal_health"
        },  
        {
            image:production,
            title:"Production",
             link:"/production"
        }, 
   
    ]
    // ${show?'block':'hidden'}
    // 

    const handleNextPage = (page, title)=>{
      Setloadpop(true)
      let object = {'tagnumber':'', 'id':'', 'editx':''}
      window.localStorage.setItem('tagnumber', JSON.stringify(object))
      SetaddAnimal(false)
      // let titleans = title == 'animal'?true:false
      // SetClickonanilmal(titleans)
      Setistitle(title)
      setTimeout(()=>{
      
        router.replace({
          pathname:page,
      })
      },1000)
  
    }


    return (
      <div className={`w-3/5 sm:w-1/2 md:w-1/3 lg:w-1/5 h-full flex flex-col items-center border z-10 absolute bg-white top-16 lg:static lg:block  ${show ? 'translate-x-0 transition ease-in-out delay-500 ' : ' -translate-x-full sm:-translate-x-full md:-translate-x-full lg:translate-x-0  transition ease-in-out delay-500 '}`}>

        <section className="w-11/12 flex flex-row items-center justify-center space-x-2 mt-8">
          <span className="w-12 h-12 rounded-full">
            <Image
              src={userimage}
              className="h-full w-full"
              alt="owner image"
            />
          </span>
          <span className="w-32 flex flex-col float-left">
            <h3 className="font-semibold capitalize text-base text-left">
              Gavano
            </h3>
            <h4 className="text-xs font-thin text-[#A4A4A4] text-left">
              Farm Owner
            </h4>
          </span>

          <span className="h-6 w-6 px-2 rounded-md grid place-content-center bg-[#EBEBEB]">
            <HiOutlineDotsHorizontal className="text-black text-lg" />
          </span>
        </section>

        <section className="w-full mt-8  flex flex-col gap-2 cursor-pointer">
          {subMenu.map((item, index) => (
          //  <Link href={item.link}  key={index} onClick={()=>Setistitle(item.title)}>
            <div
             key={index} 
              onClick={()=>handleNextPage(item.link, item.title)}
              className={istitle == item.title?"border-l-2 border-[#4066C2] bg-[#F8F8F8] flex flex-row items-center justify-center space-x-2 p-1":"hover:border-l-2 hover:border-[#4066C2] hover:bg-[#F8F8F8] flex flex-row items-center justify-center space-x-2 p-1 cursor-pointer"}
            >
              <span className="w-6 h-6 cursor-pointer" onClick={()=>handleNextPage(item.link, item.title)}>
                <Image
                  src={item.image}
                  className="w-full h-full cursor-pointer"
                  alt="Dashboard"
                />
              </span>
              <span onClick={()=>handleNextPage(item.link, item.title)} className={istitle == item.title?"w-1/2 capitalize  text-[#4066C2] cursor-pointer":"w-1/2 capitalize text-black hover:text-[#4066C2] cursor-pointer"} >
               {item.title}
              </span>
            </div>
            // </Link> 
          ))}
        </section>

        <section className="w-full mt-12  flex flex-col gap-2 cursor-pointer">
        {subMenutwo.map((item, index) => (
            <div
            onClick={()=>handleNextPage(item.link, item.title)}
              key={index}
              className="hover:border-l-2 hover:border-[#4066C2] hover:bg-[#F8F8F8] flex flex-row items-center justify-center space-x-2 p-1 cursor-pointer"
            >
              <span className="w-6 h-6" onClick={()=>handleNextPage(item.link, item.title)}>
                <Image
                  src={item.image}
                  className="w-full h-full"
                  alt="Dashboard"
                />
              </span>
              <span className={istitle == item.title?"w-1/2 capitalize  text-[#4066C2] cursor-pointer":"w-1/2 capitalize text-black hover:text-[#4066C2] cursor-pointer"}>
                {item.title}
              </span>
            </div>
          ))}

        </section>
      </div>
    );
}
