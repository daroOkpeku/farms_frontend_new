"use client";
import React,{useEffect, useState, useContext} from 'react'
import Image from 'next/image'
import img from '../../image/WhatsApp Image 2024-04-19 at 22.26.21.jpeg';
import { RiDeleteBin6Line } from "react-icons/ri";
import { context } from '../context';
// import { Document, Page } from 'react-pdf';
// import { setPdfWorker } from '../.././../lib/setPdfWorker';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import "@react-pdf-viewer/core/lib/styles/index.css";

// defaultLayoutPlugin 
export default function Record_grid({pdfList}) {
  const created = useContext(context)
  const { Api_Connect, Setmessage,  Setsuccess, Setfailure, SetPDFlink, Setispdf, SetisisProcessing} = created


    const data = [

        {
            image:img,
            animalname:'cattle',
            animalfarm:'wellness farm',
            seial_number:'25737TFHGK',
            special_name:'Lagos Cow'
        },
        
        {
            image:img,
            animalname:'cattle',
            animalfarm:'wellness farm',
            seial_number:'25737TFHGK',
            special_name:'Lagos Cow'
        },
        
        {
            image:img,
            animalname:'cattle',
            animalfarm:'wellness farm',
            seial_number:'25737TFHGK',
            special_name:'Lagos Cow'
        },
        
        {
            image:img,
            animalname:'cattle',
            animalfarm:'wellness farm',
            seial_number:'25737TFHGK',
            special_name:'Lagos Cow'
        },
        
        {
            image:img,
            animalname:'cattle',
            animalfarm:'wellness farm',
            seial_number:'25737TFHGK',
            special_name:'Lagos Cow'
        },
        
        {
            image:img,
            animalname:'cattle',
            animalfarm:'wellness farm',
            seial_number:'25737TFHGK',
            special_name:'Lagos Cow'
        },
        
        {
            image:img,
            animalname:'cattle',
            animalfarm:'wellness farm',
            seial_number:'25737TFHGK',
            special_name:'Lagos Cow'
        }

    ]

    const [numPages, setNumPages] = useState();
const [pageNumber, setPageNumber] = useState(1);

function onDocumentLoadSuccess({ numPages }) {
  setNumPages(numPages);
}



const handleDelete = (id)=>{
  SetisisProcessing(true)
    let headers = {
        'Content-Type': 'application/json',
         'Accept': 'application/json',
         "X-API-KEY": process.env.NEXT_PUBLIC_CODE
    };

  let formData =  JSON.stringify({
        'id':id,
        '_method':'delete'
    })
    let url = 'documentdelete';
    Api_Connect.get('/sanctum/csrf-cookie').then(() => {
        // Api_Connect.post(`/api/${url}`, { headers, data:formData })
        // .then(res => {
        //   if(res.data.success){
        //     Setsuccess(true)
        //     SetisisProcessing(false)
        //     Setmessage(res.data.success)
        //   }else{
            
        //     Setsuccess(true)
        //     SetisisProcessing(false)
        //     Setmessage(res.data.message)
        //   }
            
        // })
        // .catch(err => {
        //     let error = err.response.data.errors
        //     if(error.id){
        //       Setfailure(true)
        //       SetisisProcessing(false)
        //     Setmessage(error.id[0])
        //     }
        // });

        let url = 'documentdelete/'+`${parseInt(id)}`;
        Api_Connect.delete(`/api/${url}`,  {
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              "X-API-KEY": process.env.NEXT_PUBLIC_CODE
              // Add other headers if needed, such as Authorization
          }
      } )
        .then(res => {
       
          SetisisProcessing(false)
          // console.log(res)
        if(res.data.success){
          Setsuccess(true)
          SetisisProcessing(false)
          Setmessage(res.data.success)
        }else{
          
          Setfailure(true)
          SetisisProcessing(false)
          Setmessage(res.data.error)
        }
          
      })
        
    })

  }

  const handleNext = (url)=>{
    SetPDFlink(url)
    Setispdf(true)
  }



    return (
        <div className='overflow-x-auto w-full scrollbar overflow-hidden '>
            <section  className="w-full flex flex-col sm:grid sm:grid-cols-2 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 gap-3 justify-items-center items-center  bg-white mt-4 rounded-md  min-w-full py-4">
            {pdfList.map((item, index)=>{
              return <div key={index} className='w-10/12 sm:w-60 md:w-60 lg:w-60 rounded-md flex flex-col items-center  border shadow-sm'>
                  <section className='h-38 w-full relative   '>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                        <Viewer
                          fileUrl={item.url}
                          // plugins={[defaultLayoutPluginInstance]}
                        />
                      </Worker>
                  
                  
                    <span className='absolute w-full h-full left-0  bottom-0  right-0 hover:bg-black top-0  hover:backdrop-blur-[1px] hover:bg-opacity-10 px-2 py-2'>
                      <span className='w-full mt-2'>
                            <div className='w-6 h-8   float-right '>
                            <button onClick={()=>handleDelete(item.id)} className='w-full bg-[#4066C2] flex-row justify-center items-center py-1 px-1 rounded-sm'>
                              <RiDeleteBin6Line className='m-auto text-white'/>
                            </button>
                            </div>
                      </span>

                      <span className='w-full mt-16 flex  items-center justify-center'>

                          <button onClick={()=>handleNext(item.url)} className='w-3/4 m-auto capitalize font-medium border text-sm border-white text-white rounded-sm'> 
                            view
                          </button>

                      </span>
                    </span>
                  </section>
                  {/* <scetion className="w-full flex flex-col items-center py-1 px-2 gap-1">
                   <span className='w-full text-left capitalize  font-medium text-sm' name="animalname">{item.animalname}</span>
                   <span className='w-full text-left capitalize font-medium text-sm' name="farmname">{item.animalfarm}</span>
                   <span className='w-full text-left capitalize font-medium text-sm' name="serialnumer">{item.seial_number}</span>
                   <span className='w-full text-left capitalize font-medium text-sm' name="species">{item.seial_number}</span>
                  </scetion> */}
                  </div>    

     



            })}
                </section>
            
        </div>
    )
}
