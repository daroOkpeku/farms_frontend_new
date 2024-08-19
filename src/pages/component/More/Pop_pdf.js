import React from 'react'
import { Viewer, Worker, defa } from '@react-pdf-viewer/core';
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
export default function Pop_pdf({PDFlink,  ispdf, Setispdf}) {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    return (
        <div className={ispdf? 'w-full top-0 left-0 right-0 bottom-0 z-50 fixed bg-cover bg-black bg-opacity-10  backdrop-blur-[2px] flex flex-row items-center justify-center':"hidden"} >

        
        <section className='bg-white rounded-md w-10/12 sm:w-10/12 md:w-3/4 lg:w-3/4 mt-10 flex flex-col items-center gap-4 py-4'>
         <article className='w-full'>
            <div className='w-[5%] float-right'>
            <span onClick={()=>Setispdf(false)} className=' rounded-full h-10 w-10 text-black text-center grid place-content-center capitalize text-base cursor-pointer'>x</span>
            </div>
         </article>
        <div className='w-[97%] flex flex-row items-center justify-center mt-2 h-[27rem] overflow-y-scroll border'>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                        <Viewer
                          fileUrl={PDFlink}
                          plugins={[defaultLayoutPluginInstance]}
                        />
                      </Worker>
          
        </div>
       
          
        </section>


        </div>
    )
}
