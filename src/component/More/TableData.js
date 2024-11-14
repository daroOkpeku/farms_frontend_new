import React from 'react'
import Image from 'next/image';
import cattle from "../../image/cow.png";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useRouter } from 'next/router';
export default function TableData({Datax, Api_Connect, Setmessage, Setsuccess, SetaddAnimal, SetEditId, Setfailure, SetisHeading, SetisisProcessing, SetClickonanilmal}) {


const router = useRouter();

  const handleEdit =(id, uid)=>{
    // router.replace({
    //     pathname
    // })
    SetisHeading('Animal Records')
    SetEditId(id)
    SetaddAnimal(true)
    SetClickonanilmal(true)
    let object = {'tagnumber':id, 'id':uid, 'editx':'isedit'}
   window. localStorage.setItem('tagnumber', JSON.stringify(object))
    // localStorage.setItem('id', JSON.stringify(uid))
    // localStorage.setItem('editx', 'isedit')
  }

  const handleDelete = (id)=>{


    // let url = 'animaldata';
    Api_Connect.get('/sanctum/csrf-cookie').then(() => {

        let url = 'deleteanimal/'+`${parseInt(id)}`;
            Api_Connect.delete(`/api/${url}`,  {
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  // Add other headers if needed, such as Authorization
              }
          } )
            .then(res => {
              console.log(res)
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

    return (
      //   <div className='w-full '>
      //   <table className='w-full flex flex-col items-center justify-center mt-4 rounded-md py-2  px-8'>
      //   <thead className='w-full border-b'>
      //      <tr className='gap-x-20 justify-between flex flex-row items-center'>
      //      <th className='text-[#858D9D]  font-medium  capitalize text-[14px] lg:text-base text-center whitespace-nowrap'>animal name</th>
      //      <th className='text-[#858D9D]  font-medium  capitalize text-[14px] lg:text-base  text-center whitespace-nowrap'>unique ID</th>
      //      <th className='text-[#858D9D]  font-medium  capitalize text-[14px] lg:text-base text-center whitespace-nowrap'>health</th>
      //      <th className='text-[#858D9D]  font-medium  capitalize text-[14px] lg:text-base text-center whitespace-nowrap'>sex</th>
      //      {/* <th className='text-[#858D9D]  font-medium  capitalize text-[14px] lg:text-base text-center whitespace-nowrap'>status</th> */}
      //      <th className='text-[#858D9D]  font-medium  capitalize  text-[14px] lg:text-base text-center whitespace-nowrap'>action</th>
      //      </tr>
      //   </thead>
      //   <tbody className='w-full  mt-2 '>
      //       {Datax.length >0 && Datax.map((item, index)=>{
      //            if (item.image) {
      //             const cleanedString = item.image.replace('//uploads', '/uploads');
      //             return <tr key={index} className='gap-x-20 justify-between flex flex-row items-center'>
      //             <td className='flex flex-row items-center justify-center pt-6 ' >
      //            <div className='flex flex-row items-center space-x-1 whitespace-nowrap w-9'>
      //             {/* <img src={cleanedString?cleanedString:cattle} alt='cow' className=' rounded-full' /> */}
      //             <p className='text-[13px] md:textbase lg:text-base font-semibold'>{item.name}</p>
      //             </div> 
      //             </td>
  
      //             <td className=' text-center uppercase font-medium text-[13px] pt-6 md:text-sm lg:text-sm whitespace-nowrap '>
      //              {item.tag_id}
      //             </td>
      //             <td className='text-center uppercase font-medium text-[13px] pt-6 md:text-sm lg:text-sm whitespace-nowrap '>
      //                {item.health_status}
      //             </td>
      //             <td className='text-center uppercase  font-semibold text-[13px] pt-6 md:text-sm lg:text-sm whitespace-nowrap '>
      //               {item.sex}
      //             </td>
      //             {/* <td className='text-center uppercase font-semibold whitespace-nowrap pt-6 '>
      //               <div className='bg-green-200 text-green-500 rounded-sm px-2 py-1 w-26 text-[8px] md:w-20 md:text-[9px] md:m-auto lg:w-32 lg:text-sm m-auto'>{item.status}</div>
      //             </td> */}
                 
      //             <td className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2  place-content-center whitespace-nowrap pt-6 py-2 '>
      //                 <span className=' capitalize text-[13px] md:text-sm lg:text-[10px] lg:text-center underline underline-offset-1  cursor-pointer m-auto'><MdModeEditOutline onClick={()=>handleEdit(item.tag_id, item.id)} className='text-green-500 text-lg'/></span>
      //                 <span className=' capitalize text-[13px] md:text-sm lg:text-[10px] lg:text-center underline underline-offset-1  cursor-pointer m-auto'><MdDelete onClick={()=>handleDelete(item.id)} className='text-red-500 text-lg' /></span>
  
      //             </td>
      //          </tr>
      //            }else{
      //           return <tr key={index} className='gap-x-20 justify-between flex flex-row items-center'>
      //           <td className='flex flex-row items-center justify-center pt-6 ' >
      //          <div className='flex flex-row items-center space-x-1 whitespace-nowrap '>
      //           {/* <img src={item.image?item.image:cattle} alt='cow' className=' rounded-full w-9' /> */}
      //           <p className='text-[13px] md:textbase lg:text-base font-semibold'>{item.name}</p>
      //           </div> 
      //           </td>

      //           <td className=' text-center uppercase font-medium text-[13px] pt-6 md:text-sm lg:text-sm whitespace-nowrap '>
      //            {item.tag_id}
      //           </td>
      //           <td className='text-center uppercase font-medium text-[13px] pt-6 md:text-sm lg:text-sm whitespace-nowrap '>
      //              {item.health_status}
      //           </td>
      //           <td className='text-center uppercase  font-semibold text-[13px] pt-6 md:text-sm lg:text-sm whitespace-nowrap '>
      //             {item.sex}
      //           </td>
      //           {/* <td className='text-center uppercase font-semibold whitespace-nowrap pt-6 '>
      //             <div className='bg-green-200 text-green-500 rounded-sm px-2 py-1 w-26 text-[8px] md:w-20 md:text-[9px] md:m-auto lg:w-32 lg:text-sm m-auto'>{item.status}</div>
      //           </td> */}
               
      //           <td className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2  place-content-center whitespace-nowrap pt-6 py-2 '>
      //               <span className=' capitalize text-[13px] md:text-sm lg:text-[10px] lg:text-center underline underline-offset-1  cursor-pointer m-auto'><MdModeEditOutline onClick={()=>handleEdit(item.tag_id, item.id)} className='text-green-500 text-lg'/></span>
      //               <span className=' capitalize text-[13px] md:text-sm lg:text-[10px] lg:text-center underline underline-offset-1  cursor-pointer m-auto'><MdDelete onClick={()=>handleDelete(item.id)} className='text-red-500 text-lg' /></span>

      //           </td>
      //        </tr>
      //            }
      //       })}
      //        {Datax.length == 0 && "No Data Yet"}
          
      //   </tbody>

      //  </table>
      //  </div>


      // <div className="w-full py-2 px-2">
      <table className="w-dvw sm:w-dvw md:w-full lg:w-full  rounded-md">
        <thead className="">
          <tr className="">
            <th className="text-[#858D9D]  capitalize text-sm sm:text-[9px] md:text-sm lg:text-sm font-medium text-center whitespace-nowrap">animal type</th>
            <th className="text-[#858D9D]  capitalize text-sm sm:text-[9px] md:text-sm lg:text-sm font-medium text-center whitespace-nowrap">unique ID</th>
            <th className="text-[#858D9D] capitalize text-sm sm:text-[9px] md:text-sm lg:text-sm font-medium text-center whitespace-nowrap">health</th>
            <th className="text-[#858D9D]  capitalize text-sm sm:text-[9px] md:text-sm lg:text-sm font-medium text-center whitespace-nowrap">sex</th>
            <th className="text-[#858D9D]  capitalize text-sm sm:text-[9px] md:text-sm lg:text-sm font-medium text-center whitespace-nowrap">action</th>
          </tr>
        </thead>
        <tbody className="w-full mt-2">
          {Datax.length > 0 && Datax.map((item, index) => {
            // const cleanedString = item.image?.replace('//uploads', '/uploads') || '';
            const image = item.image ? item.image.replace('//uploads', '/uploads'):'https://ik.imagekit.io/9nikkw38wtz/no-pictures_fXzzro9jj.png?updatedAt=1724149999774';

            return (
              <tr key={item.id} className="">
                <td className="flex flex-row items-center justify-center pt-6 text-center">
                <div className='w-6 h-6 sm:w-6 sm:h-6 md:w-9 md:h-9 lg:w-9  lg:h-9  rounded-full'>
                    <img src={image} alt='img' className='object-cover rounded-full h-full w-full' />
                  </div>
                  <div className="items-center space-x-1 whitespace-nowrap ">
                    <p className="text-xs md:textbase lg:text-base font-semibold">{item.name}</p>
                  </div>
                </td>
                <td className="text-center uppercase font-medium text-xs pt-6 md:text-sm lg:text-sm whitespace-nowrap ">
                  {item.tag_id}
                </td>
                <td className="text-center uppercase font-medium text-xs pt-6 md:text-sm lg:text-sm whitespace-nowrap  px-4">
                  {item.health_status}
                </td>
                <td className="text-center uppercase font-semibold text-xs pt-6 md:text-sm lg:text-sm whitespace-nowrap px-4">
                  {item.sex}
                </td>
                <td className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 place-content-center whitespace-nowrap pt-6 py-2 px-4">
                  <span className="capitalize text-[13px] md:text-sm lg:text-[10px] lg:text-center underline underline-offset-1 cursor-pointer m-auto">
                    <MdModeEditOutline onClick={() => handleEdit(item.tag_id, item.id)} className="text-green-500 text-lg" />
                  </span>
                  <span className="capitalize text-[13px] md:text-sm lg:text-[10px] lg:text-center underline underline-offset-1 cursor-pointer m-auto">
                    <MdDelete onClick={() => handleDelete(item.id)} className="text-red-500 text-lg" />
                  </span>
                </td>
              </tr>
            );
          })}
          {Datax.length === 0 && "No Data Yet"}
        </tbody>
      </table>
    // </div>
    )
}
