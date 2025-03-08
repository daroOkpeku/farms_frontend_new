import React,{useEffect, useState} from 'react'
import Image from 'next/image';
import TableData from './More/TableData';
import ReactPaginate from 'react-paginate';


export default function Container({SetaddAnimal, Api_Connect, Setsuccess, Setmessage, SetEditId, Setfailure, SetisHeading, SetisisProcessing, Setloadpop, Loadpop, SetClickonanilmal}) {
    
const [Datax, setDatax] = useState([])
const [last_Page, setlast_Page] = useState(1)

    useEffect(()=>{
        // Setloadpop(true)
        let headers = {
            'Content-Type': 'application/json',
             'Accept': 'application/json',
            "X-API-KEY": process.env.NEXT_PUBLIC_CODE
        };
        let url = 'animaldatatable';
        Api_Connect.get('/sanctum/csrf-cookie').then(() => {
            Api_Connect.get(`/api/${url}`, { headers })
                .then(res => {
                  if(res.data.data){
                    
                    setDatax(res.data.data)
                    setlast_Page(res.data.meta.last_page)
                    // Setloadpop(false)
                          // Setloadpop(true)

                          const timer = setTimeout(()=>{
                            Setloadpop(Loadpop=>false)
                        },3500)
               
                  }
                    
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }).catch(error => {
            console.error('Error fetching CSRF cookie:', error);
        });
     
    
        
      
   
        //    return () => clearTimeout(timer);
    
    },[Api_Connect, setDatax, Setloadpop]);

    const handlePaginate =(ans)=>{
        let Answer = ans.selected + 1;
            let headers = {
                'Content-Type': 'application/json',
                 'Accept': 'application/json',
                 "X-API-KEY": process.env.NEXT_PUBLIC_CODE
            };
            let url = 'animaldatatable?page='+Answer;
            Api_Connect.get('/sanctum/csrf-cookie').then(() => {
                Api_Connect.get(`/api/${url}`, { headers })
                    .then(res => {
                      if(res.data.data){
                        
                        setDatax(res.data.data)
                        setlast_Page(res.data.meta.last_page)
        
        
                      }
                        
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            }).catch(error => {
                console.error('Error fetching CSRF cookie:', error);
            });
        
  
    }

    // SetaddAnimal  Setfailure
    const handleAdd=()=>{
        SetaddAnimal(true)
        SetClickonanilmal(true)
        // Setfailure(true)
    }

    return (
        <div className='w-full sm:w-full md:w-[98%] lg:w-[98%] px-2 py-2'>
        <section className='w-full flex flex-col items-center  h-[35rem] overflow-y-scroll scrollbar'>
            <article className='w-full'>
                <span className='w-1/3 sm:w-1/3 md:w-[9%] lg:w-[12%] float-right'>
                 <button onClick={handleAdd} className='w-full capitalize flex flex-row items-center justify-center space-x-3   bg-[#5570F1] py-2 px-2 text-[9px] sm:text-[9px]  md:text-sm lg:text-sm text-white rounded-md '>
                    <h3>+</h3>   <h3>Add New</h3>
                 </button>
                </span>
             </article> 

              <div className='w-full  h-[27rem]  scrollbar overflow-x-scroll overflow-y-scroll mt-3 rounded-md bg-white'>
                     {Datax.length > 0?
                   <TableData  Setsuccess={Setsuccess}  Datax={Datax} Api_Connect={Api_Connect}  Setmessage={Setmessage} SetaddAnimal={SetaddAnimal} SetEditId={SetEditId} Setfailure={Setfailure}  SetisHeading={SetisHeading}  SetisisProcessing={SetisisProcessing}  SetClickonanilmal={SetClickonanilmal} /> 
                     :
                     <span className='w-full mt-10 flex item-center justify-center text-center capitalize text-base font-bold'>No Data yet</span>
                     }
                
              </div>
              <div className='w-full mt-1 px-2'>
                     <article className=" w-11/12 sm:w-[50%] md:w-[40%] lg:w-[40%]  float-left">
                         <ReactPaginate
                         containerClassName="w-full flex flex-row items-center  space-x-2"
                         pageClassName="w-8 text-xs sm:w-8 sm:w-6 sm:text-xs md:w-8 md:h-8 md:text-sm  lg:w-6 lg:h-6 lg:text-sm grid place-content-center rounded-full bg-[#4C4C4C] text-white hover:bg-blue-500 hover:text-black "
                           pageRangeDisplayed={3}
                           pageCount={last_Page}
                           onPageChange={handlePaginate}
                           nextClassName='text-xs sm:text-xs md:text-base lg:text-base'
                           previousClassName='text-xs sm:text-xs md:text-base lg:text-base'
                           nextLabel="next"
                           previousLabel="prev"
                         />
                     </article>
                    </div>
             
            
         </section>
     </div>
    )
}
