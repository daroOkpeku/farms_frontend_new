import React from 'react'
import Finance_table from './More/Finance_table';
import ReactPaginate from 'react-paginate';
import {useContext , useState, useEffect} from "react"
import { context } from './context';
export default function Container_finance() {
  const created = useContext(context)
  const { Api_Connect, Setmessage, message, SetisHeading, isHeading, addAnimal, SetaddAnimal,Setcreated_tag, Setsuccess, Setfailure, SetisisProcessing, Setloadpop, SetClickonanilmal} = created
const [List, Setlist] = useState([])
const [last_Page, setlast_Page] = useState(1)


  useEffect(()=>{


    let headers = {
      'Content-Type': 'application/json',
       'Accept': 'application/json',
       "X-API-KEY": process.env.NEXT_PUBLIC_CODE
  };
  let url = 'finance_list';
  Api_Connect.get('/sanctum/csrf-cookie').then(() => {
    Api_Connect.get(`/api/${url}`, { headers })
    .then(res => {
      if(res.data.success){
       
        Setlist(res.data.success.data)
        setlast_Page(res.data.success.last_page)
        // Setloadpop(false)
        const timer = setTimeout(()=>{
          Setloadpop(false)
         },3500)
      }
    })

  })
  // Setloadpop(true)

  //  return () => clearTimeout(timer);
  },[Api_Connect, Setloadpop])

  
  const handlePaginate =(ans)=>{
    let Answer = ans.selected + 1;
        let headers = {
            'Content-Type': 'application/json',
             'Accept': 'application/json',
           "X-API-KEY": process.env.NEXT_PUBLIC_CODE
        };
        let url = 'finance_list?page='+Answer;
        Api_Connect.get('/sanctum/csrf-cookie').then(() => {
            Api_Connect.get(`/api/${url}`, { headers })
                .then(res => {
                  if(res.data.success){
                    
                    Setlist(res.data.success.data)
                    setlast_Page(res.data.success.last_page)
    
    
                  }
                    
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }).catch(error => {
            console.error('Error fetching CSRF cookie:', error);
        });
    

}


  return (
    <div className='w-full sm:w-full md:w-[98%] lg:w-[98%] h-screen px-2 py-2'>
        <section className='w-full flex flex-col items-center'>
            

              <div className='w-full  h-[27rem] scrollbar overflow-x-scroll overflow-y-scroll bg-white mt-3 rounded-md'>
             {List.length >0
             ? 
               <Finance_table List={List} Api_Connect={Api_Connect}  SetisHeading={SetisHeading}  Setcreated_tag={Setcreated_tag}  SetaddAnimal={SetaddAnimal}  Setmessage={Setmessage} Setsuccess={Setsuccess}  Setfailure={Setfailure} SetisisProcessing={SetisisProcessing} SetClickonanilmal={SetClickonanilmal}  />
                :
                <span className='w-full mt-10 flex item-center justify-center text-center capitalize text-base font-bold'>No Data yet</span>
              }
              </div>
              <div className='w-full mt-1 px-2'>
                     <article className="w-11/12 m-auto sm:w-[50%] sm:m-auto md:w-[40%] lg:w-[40%]   float-left">
                         <ReactPaginate
                         containerClassName="w-full  flex flex-row items-center  space-x-2"
                         pageClassName="w-8 w-8 text-xs sm:w-6 sm:w-6 sm:text-xs md:w-8 md:h-8 md:text-sm  lg:w-6 lg:h-6 lg:text-sm grid place-content-center rounded-full bg-[#4C4C4C] text-white hover:bg-blue-500 hover:text-black "
                           pageRangeDisplayed={3}
                           pageCount={last_Page}
                           onPageChange={handlePaginate}
                           nextClassName='text-xs sm:text-xs md:text-base lg:text-base'
                           previousClassName='text-xs sm:text-xs md:text-base lg:text-base'
                           nextLabel="next page"
                           previousLabel="previous page"
                         />
                     </article>
                    </div>
             
            
         </section>
     </div>
  )
}
