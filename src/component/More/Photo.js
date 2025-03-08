import React,{useState, useEffect} from 'react'
import { FileUploader } from "react-drag-drop-files";
import { FaArrowRight } from 'react-icons/fa6'
import Image from 'next/image';
 const Photo = ({ Api_Connect, created_tag, Setsuccess, Success, Setfailure, Failure, SetisisProcessing}) => {
  const fileTypes = ["JPG", "PNG", "JPEG"];
  const [Filex, setFile] = useState(null);
  const [isexist, setIsexist] = useState(true)
  const [existImage, setExistImage] = useState(null)
useEffect(()=>{
  let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "X-API-KEY": process.env.NEXT_PUBLIC_CODE
  };
  if(created_tag){
  let urlz = "animaldetailsget";
  Api_Connect.get("/sanctum/csrf-cookie").then(() => {
    Api_Connect.get(`/api/${urlz}/?tagnumber=`+created_tag, { headers })
      .then((res) => {
        if (res.data.success) {
          let dataeach = res.data.success
           let statusimg = dataeach.image == null || dataeach.image == ''?false:true
           setIsexist(statusimg)
           setExistImage(dataeach.image)
        }
      })
    })
  }
},[Api_Connect, created_tag])


  // const handleChange = (data) => {
  //   console.log(data)
  //     setFile(data);
  //   };





   const handSubmit = ()=>{
    SetisisProcessing(true)
    let headers = {
      "Content-Type": "multipart/form-data",
      "Accept": "application/json",
      "X-API-KEY": process.env.NEXT_PUBLIC_CODE
    };
    let url = 'photo'
    let formdata = new FormData();
    formdata.append('tagnumber', created_tag)
    formdata.append('image', Filex)
    formdata.append('_method', 'put')
    Api_Connect.get("/sanctum/csrf-cookie").then(() => {
      Api_Connect.post(`/api/${url}`, formdata, {headers} )
      .then((res) => {
        if (res.data.success) {
          Setsuccess(true);
          SetisisProcessing(false)
          Setmessage(res.data.success);
        }else if(res.data.error){
          Setfailure(true);
          SetisisProcessing(false)
          Setmessage(res.data.error);
        }
      })
       .catch((err) => {
          let error = err.response.data.errors;
          if (error.tagnumber) {
            SetisisProcessing(false)
            Setfailure(true);
            Setmessage(error.tagnumber[0]);
          } else if (error.image) {
            SetisisProcessing(false)
            Setfailure(true);
            Setmessage(error.image[0]);
          }

      })
    })
   }
    
  return (
    <div className='bg-white px-4 border-2 mt-4 rounded w-full p-3 flex flex-col gap-3  sm:flex sm:flex-col sm:gap-3   md:flex md:flex-row md:gap-8 md:h-96   lg:flex lg:flex-row lg:gap-8 lg:h-96  items-center'>
      <section className='w-full sm:w-full md:w-1/3 lg:w-1/3 flex flex-col items-center  gap-3 mt-4'>
      <div className='w-full'>
        <h3 className='text-left text-[#333333] text-sm'>Image upload</h3>
      </div>

      <article className='textl' style={{ height:"140px" }}>
     <FileUploader
 className=""
// multiple={false}
 handleChange={(e)=>setFile(e)}
   name="file"
     types={fileTypes}
   />
      </article>
      

      {isexist == false?
       <button onClick={handSubmit} className='w-full py-3 bg-[#4066C2] text-white rounded-md flex justify-center items-center space-x-3 border-none'>
       <h3 className='capitalize text-s'>Save and Continue</h3>
       <FaArrowRight className='text-sm' />
     </button>
      :
      <button onClick={handSubmit} className='w-full py-3 bg-[#4066C2] text-white rounded-md flex justify-center items-center space-x-3 border-none'>
      <h3 className='capitalize text-s'>Edit and Continue</h3>
      <FaArrowRight className='text-sm' />
    </button>
      } 
     
     
      
      </section>
      {existImage?
      <section className='w-1/2 sm:w-1/2 md:w-1/4 lg:w-1/4 rounded-md'>
      <Image src={existImage} alt=''  className='w-full h-full rounded-md'/>
    </section>
      :""}
      
      </div>
  )
}
export default Photo;