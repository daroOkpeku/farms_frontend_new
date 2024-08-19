import React from 'react'
import Record_grid from './More/Record_grid';
import ReactPaginate from 'react-paginate';

export default function Container_record({ SetaddRecord, pdfList, last_page, handlePaginate}) {
    return (
        <div className='w-full sm:w-full md:w-[98%] lg:w-[98%] px-2 py-2'>
     <section className='w-full flex flex-col items-center  h-[35rem] overflow-y-scroll scrollbar'>

     <article className='w-full'>
                <span className='w-1/5 sm:w-1/5 md:w-[9%] lg:w-[12%] float-right'>
                 <button onClick={()=>SetaddRecord(true)} className='w-full capitalize flex flex-row items-center justify-center space-x-3   bg-[#5570F1] py-2 px-2 text-[9px] sm:text-[9px]  md:text-sm lg:text-sm text-white rounded-md '>
                    <h3>+</h3>   <h3>Add New</h3>
                 </button>
                </span>
             </article>     

            <div className='w-full  h-[27rem]  scrollbar overflow-x-scroll overflow-y-scroll mt-3 rounded-md'>
              <Record_grid  pdfList={pdfList} />
            </div>
            <div className='w-full mt-1 px-2'>
                   <article classNam="w-[40%] border  float-left">
                       <ReactPaginate
                       containerClassName="w-full border flex flex-row items-center  space-x-2"
                       pageClassName="w-6 w-6 text-xs sm:w-6 sm:w-6 sm:text-xs md:w-8 md:h-8 md:text-sm  lg:w-6 lg:h-6 lg:text-sm grid place-content-center rounded-full bg-[#4C4C4C] text-white hover:bg-blue-500 hover:text-black "
                         pageRangeDisplayed={3}
                         pageCount={4}
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
