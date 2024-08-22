import React from 'react'
import Image from 'next/image';
import Group_table from './More/Group_table';
import ReactPaginate from 'react-paginate';

export default function Container_group({Data,  last_page, SetData,  Setlast_page}) {

  
  
  const handlePaginate =(ans)=>{
    console.log('hello gdgdh')
    console.log(ans)
    let Answer = ans.selected + 1;
        let headers = {
            'Content-Type': 'application/json',
             'Accept': 'application/json',
        };
        let url = 'feed_mgt?page='+Answer;
        Api_Connect.get('/sanctum/csrf-cookie').then(() => {
            Api_Connect.get(`/api/${url}`, { headers })
                .then(res => {
                  if(res.data.data){
                    
                    SetData(res.data.data)
                    Setlast_page(res.data.meta.last_page)
    
    
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
        <div className='w-full sm:w-full md:w-[98%] lg:w-[98%] px-2 py-2'>
        <section className='w-full flex flex-col items-center  h-[35rem] overflow-y-scroll scrollbar'>
            

              <div className='w-full bg-white  h-[27rem]  scrollbar overflow-x-scroll overflow-y-scroll mt-3 rounded-md'>
             {Data.length > 0?   
              <Group_table  Data={Data} />
              :
                <span className='w-full mt-10 flex item-center justify-center text-center capitalize text-base font-bold'>No Data yet</span>
              }
              </div>
              <div className='w-full mt-1 px-2'>
                     <article className="w-[40%] border  float-left">
                         <ReactPaginate
                         containerClassName="w-full border flex flex-row items-center  space-x-2"
                         pageClassName="w-6 w-6 text-xs sm:w-6 sm:w-6 sm:text-xs md:w-8 md:h-8 md:text-sm  lg:w-6 lg:h-6 lg:text-sm grid place-content-center rounded-full bg-[#4C4C4C] text-white hover:bg-blue-500 hover:text-black "
                           pageRangeDisplayed={3}
                           pageCount={last_page}
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
