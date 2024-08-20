import React,{useContext , useState, useEffect} from 'react'
import Top_Sub from './More/Top_Sub'
import Chart from './More/Chart'
import Recent from './More/Recent'
import Pie from './More/Pie'
import { context } from './context';
export default function Inside() {

    const created = useContext(context)
    const {Api_Connect} = created;

    return (
        <div className='w-[98%] py-2 '>
           <section className='w-full flex flex-col items-center h-[36rem] sm:h-[36rem]  md:h-[35rem]  lg:h-[35rem] overflow-y-scroll scrollbar'>
                 <Top_Sub Api_Connect={Api_Connect} />
                 <Chart Api_Connect={Api_Connect} />
                 <div className='w-full flex lg:flex-row  justify-between flex-col  '>
                 <Recent  Api_Connect={Api_Connect} />
                 <Pie  Api_Connect={Api_Connect} />
                 </div>

              
           </section>
        </div>
    )
}
