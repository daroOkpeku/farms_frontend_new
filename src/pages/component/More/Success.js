import React,{useContext} from 'react'
import { FaCircleCheck } from "react-icons/fa6";
import { context } from '../context';
export default function Success({ Success, Setsuccess }) {
    const created = useContext(context)
    const {message, Setmessage} = created
    // console.log('message check', message)
    return (
        <div className={Success?'w-full top-0 left-0 right-0 bottom-0 z-50 fixed bg-cover bg-black bg-opacity-10  backdrop-blur-[2px] flex flex-row items-center justify-center':'hidden'} >

        
        <section className='bg-white rounded-md w-10/12 sm:w-3/5 md:w-1/2 lg:w-2/5 mt-10 flex flex-col items-center gap-4 py-4'>

        <div className='w-full flex flex-row items-center justify-center mt-2'>
            <span className='w-24 h-24'>
            <FaCircleCheck className='w-full h-full text-green-400'/>
            </span>
          
        </div>
        <article className='w-full flex flex-col items-center justify-center gap-3'>
            <span className='w-3/4 text-center text-sm sm:text-base md:text-2xl lg:text-2xl font-semibold capitalize'>{message?message:'successful'}</span>

            <button onClick={()=>Setsuccess(false)} className='bg-[#4066C2] text-white w-1/3 m-auto rounded-md py-3 capitalize'>close</button>
        </article>
          
        </section>


        </div>
    )
}
