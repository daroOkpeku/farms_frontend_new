import React,{useState, useEffect, useContext} from 'react'
import { FileUploader } from "react-drag-drop-files";
import { FaArrowRight } from 'react-icons/fa6'

import { context } from './context';
export default function AddRecord({SetaddRecord}) {
  const created = useContext(context)
  const { Api_Connect, Setmessage, message, SetisHeading, isHeading, addAnimal, SetaddAnimal,Setcreated_tag, Setsuccess, Setfailure} = created

      const fileTypes = ["PDF"];
  const [file, setFile] = useState(null);

  const handleChange = (file) => {
      setFile(file);
   
    };

  



       const handSubmit = ()=>{
        // console.log(file)
    let formdata = new FormData();
    formdata.append('pdf', file)
    let headers = {
      'Content-Type':"multipart/form-data",
       'Accept': 'application/json',
       "X-API-KEY":  process.env.NEXT_PUBLIC_CODE
  };
    let url = 'documentupload';
    Api_Connect.get('/sanctum/csrf-cookie').then(() => {
      Api_Connect.post(`/api/${url}`, formdata, {headers} )
      .then(res => {
        console.log(res.data)
       if(res.data.success){
        Setmessage(res.data.success)
        Setsuccess(true)
        SetaddRecord(false)
       }
      }).catch((err) => {
        let error = err.response.data.errors;
        if (error.pdf) {
          Setfailure(true);
          Setmessage(error.pdf[0]);
        }
      })
    })


   }

    return (

        <div className='w-full sm:w-full md:w-[98%] lg:w-[98%] px-2 py-2'>
     <section className='w-full flex flex-col items-center  h-[35rem] overflow-y-scroll scrollbar'>


     <div className='bg-white px-4 border-2 mt-4 rounded w-full h-96 p-3 overflow-x-scroll sm:overflow-x-scroll md:overflow-hidden lg:overflow-hidden '>
      <section className='w-full sm:w-full md:w-1/3 lg:w-1/3 flex flex-col items-center justify-center  gap-3 mt-4 '>
      <div className='w-full'>
        <h3 className='text-left text-[#333333] text-sm font-semibold'>Record upload</h3>
      </div>

      <article className='textl w-full' style={{ height:"140px", width:'45rem', margin:'auto' }}>
     <FileUploader
 className=""
multiple={false}
 handleChange={handleChange}
   name="file"
     types={fileTypes}
   />
      </article>


      <button onClick={handSubmit} className='w-full py-3 bg-[#4066C2] text-white rounded-md flex justify-center items-center space-x-3 border-none'>
          <h3 className='capitalize text-s'>Save and Continue</h3>
          <FaArrowRight className='text-sm' />
        </button>
     
      
        <button onClick={()=>SetaddRecord(false)} className='w-full py-3 bg-red-500 text-white rounded-md flex justify-center items-center space-x-3 border-none'>
          <h3 className='capitalize text-s'> go back</h3>
        </button>
      </section>
      </div>

        </section>
        </div>
      


    )
}
