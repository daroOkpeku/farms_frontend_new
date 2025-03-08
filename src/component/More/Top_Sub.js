import React,{useContext , useState, useEffect} from 'react'
import { FaArrowTrendUp, FaArrowTrendDown} from "react-icons/fa6";

import axios from 'axios'
export default function Top_Sub({Api_Connect, Setloadpop}) {

 const [topSub, setTopSub] = useState([])


   useEffect(()=>{
    //  Setloadpop(true)
      let headers = {
         'Content-Type': 'application/json',
          'Accept': 'application/json',
          "X-API-KEY": process.env.NEXT_PUBLIC_CODE
     };
     let url = 'totals';
     Api_Connect.get('/sanctum/csrf-cookie').then(() => {
         Api_Connect.get(`/api/${url}`, { headers })
             .then(res => {
               if(res.data.success){
                  setTopSub(res.data.success)
                   //  Setloadpop(true)
                const timer = setTimeout(()=>{
                  Setloadpop(false)
                },3500)
               }
                 
             })
             .catch(error => {
                 console.error('Error fetching data:', error);
             });
     }).catch(error => {
         console.error('Error fetching CSRF cookie:', error);
     });
   
    //  return () => clearTimeout(timer);
   },[Api_Connect, Setloadpop])
    



    return (
      <section className='w-full  flex lg:flex-row justify-center lg:justify-between py-2 mt-5 flex-col'>
        {
          topSub.map((item, index)=>{
          return <div key={index} className='lg:w-[23%] w-10/12 py-2 flex flex-col items-center gap-4 rounded-sm bg-white px-2 h-32 lg:mb-0 mb-2 lg:ml-0 ml-8'>
          <section className='w-full flex flex-row items-center justify-between'>
              <span className='text-sm capitalize font-semibold'>
                 {item.title}
              </span>
              {/* <span className={parseInt(item.degree) < 10?'w-16 flex flex-row text-sm capitalize rounded-full py-1 bg-red-500 bg-opacity-20 justify-center items-center ' :'w-16 flex flex-row text-sm capitalize rounded-full py-1 bg-green-500 bg-opacity-20  justify-center items-center '} >
                  <h3>
                    {parseInt(item.degree) < 10?
                    <FaArrowTrendDown className='text-xs'/> :
                    <FaArrowTrendUp className='text-xs'/>
                    } 
                  </h3>
                 <h3 className='text-xs'>{item.degree}%</h3>
              </span> */}
          </section>
  
          <span className='w-full font-bold text-lg text-left'>
              {item.total}
          </span>
  
  
         <span className='w-full font-normal text-xs capitalize text-left'>
           {item.subtitle}
         </span>
       </div>
          })  
        }
     
      </section>
  
    )
}
