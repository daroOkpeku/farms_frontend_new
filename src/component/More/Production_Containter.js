import React from 'react'
import {useContext , useState, useEffect} from "react"
import { context } from '../context';
import ReactPaginate from 'react-paginate';
import Production_table from './Production_table';

export default function Production_Containter({ SetClickonanilmal}) {
    const created = useContext(context)
    const { Api_Connect, Setmessage, message, SetisHeading, isHeading, addAnimal, SetaddAnimal,Setcreated_tag, Setsuccess, Setfailure, SetisisProcessing, Setloadpop} = created

    const [List, Setlist] = useState([])
    const [last_Page, setlast_Page] = useState(1)

    
    const handlePaginate =(ans)=>{
        let Answer = ans.selected + 1;
            let headers = {
                'Content-Type': 'application/json',
                 'Accept': 'application/json',
            };
            let url = 'prouctionlist?page='+Answer;
            Api_Connect.get('/sanctum/csrf-cookie').then(() => {
                Api_Connect.get(`/api/${url}`, { headers })
                    .then(res => {
                        // console.log(res)
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


    useEffect(()=>{


        let headers = {
          'Content-Type': 'application/json',
           'Accept': 'application/json',
      };
      let url = 'prouctionlist';
      Api_Connect.get('/sanctum/csrf-cookie').then(() => {
        Api_Connect.get(`/api/${url}`, { headers })
        .then(res => {
            // console.log(res.data.success)
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

    
    
    
      },[Api_Connect, Setloadpop])

    return (
        <div className='w-full sm:w-full md:w-[98%] lg:w-[98%] h-screen px-2 py-2'>
        <section className='w-full flex flex-col items-center overflow-y-auto scrollbar'>
        <div className='w-full  h-[27rem] scrollbar overflow-x-scroll overflow-y-scroll bg-white  mt-3 rounded-md'>
          {List.length > 0?
          <Production_table List={List}  SetaddAnimal={SetaddAnimal}  Setcreated_tag={Setcreated_tag}  SetisHeading={SetisHeading}  Setmessage={Setmessage}  Setfailure={Setfailure} SetisisProcessing={SetisisProcessing} Setsuccess={Setsuccess}  SetClickonanilmal={SetClickonanilmal}  />
          :
                <span className='w-full mt-10 flex item-center justify-center text-center capitalize text-base font-bold'>No Data yet</span>
              }
        </div>
        <div className='w-full mt-1 px-2'>
        <article classNam="w-[40%]   float-left">
        <ReactPaginate
                         containerClassName="w-full  flex flex-row items-center  space-x-2"
                         pageClassName="w-6 w-6 text-xs sm:w-6 sm:w-6 sm:text-xs md:w-8 md:h-8 md:text-sm  lg:w-6 lg:h-6 lg:text-sm grid place-content-center rounded-full bg-[#4C4C4C] text-white hover:bg-blue-500 hover:text-black "
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
