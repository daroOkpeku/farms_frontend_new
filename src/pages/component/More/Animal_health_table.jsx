import React from 'react'
import cattle from '../../image/cow.png'
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { useRouter } from 'next/router';
export default function Animal_health_table({List, SetaddAnimal,  Setcreated_tag,  SetisHeading,  Setmessage,  Setfailure, Api_Connect, SetisisProcessing, Setsuccess}) {
    const router = useRouter();

    const handleEdit =(id, uid)=>{
        Setcreated_tag(id)
        // localStorage.setItem('tagnumber', JSON.stringify(id))
        // localStorage.setItem('id', JSON.stringify(uid))
        let object = {'tagnumber':id, 'id':uid, 'editx':'isedit'}
        localStorage.setItem('tagnumber', JSON.stringify(object))
        SetisHeading('Health & Veterinary')
        SetaddAnimal(true)
       setTimeout(()=>{
        router.replace({
            pathname: '/animals',
        });
       },1500)
        // SetEditId(id)
        // SetaddAnimal(true)
      }
    
      const handleDelete = (id)=>{
    
  
        Api_Connect.get('/sanctum/csrf-cookie').then(() => {
            // Api_Connect.delete(`/api/${url}`,formdata, {headers} )
            // .then(res => {
            //     console.log(res)
            //   if(res.data.success){
            //     Setsuccess(true)
            //     Setmessage(res.data.success)
            //   }else{
                
            //     Setsuccess(true)
            //     Setmessage(res.data.message)
            //   }
                
            // })
            // .catch(err => {
            //     let error = err.response.data.errors
            //     if(error.id){
            //       Setfailure(true)
            //     Setmessage(error.id[0])
            //     }
            // });

            
                let url = 'healthrecordsdelete/'+`${parseInt(id)}`;
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
        <table className='min-w-full  '>
        <thead>
           <tr className='w-full  uppercase text-sm leading-normal'>
           <th className='text-[#858D9D]  font-medium  capitalize text-[8px] sm:text-xs md:text-sm lg:text-base text-center whitespace-nowrap'> Animal type</th>
           <th className='text-[#858D9D]  font-medium  capitalize text-[8px] sm:text-xs md:text-sm  lg:text-base  text-center whitespace-nowrap'>Tag</th>
           <th className='text-[#858D9D]  font-medium  capitalize text-[8px] sm:text-xs md:text-sm  lg:text-base text-center whitespace-nowrap'>illness</th>
           <th className='text-[#858D9D]  font-medium  capitalize text-[8px] sm:text-xs md:text-sm  lg:text-base text-center whitespace-nowrap'>treatments</th>
           <th className='text-[#858D9D]  font-medium  capitalize text-[8px] sm:text-xs md:text-sm  lg:text-base text-center whitespace-nowrap'>vaccine name</th>
           <th className='text-[#858D9D]  font-medium  capitalize text-[8px] sm:text-xs md:text-sm  lg:text-base text-center whitespace-nowrap'>status </th>
           <th className='text-[#858D9D]  font-medium  capitalize text-[8px] sm:text-xs md:text-sm  lg:text-base text-center whitespace-nowrap'>action </th>
           </tr>
        </thead>
        {/* {List.map((item, index)=><p key={index}>{item.health_connect.name}, {item.tagnumber} {item.illness} {item.treatments} {item.vaccine_name} {item.status} </p>)} */}
        <tbody >
            {List.length && List.map((item, index)=>{
                return <tr key={index} className=''>
                <td className='flex flex-row items-center justify-center pt-6' >
                  <div className='flex flex-row items-center space-x-1 whitespace-nowrap'><p className='text-[8px] sm:text-xs md:text-sm lg:text-[10px] font-semibold'>{item.health_connect.name.substr(0, 50)}</p></div> </td>
                <td className='text-center uppercase font-medium  pt-6 text-[8px] sm:text-xs md:text-sm lg:text-[10px] whitespace-nowrap'>
                 {item.tagnumber.substr(0, 15)}
                </td>
                <td className='text-center uppercase font-medium  pt-6 text-[8px] sm:text-xs md:text-sm lg:text-[10px] whitespace-nowrap'>
                   {item.illness.substr(0, 10)}
                </td>
                <td className='text-center uppercase font-semibold  pt-6 text-[8px] sm:text-xs md:text-sm lg:text-[10px] whitespace-nowrap'>
                  {item.treatments.substr(0, 10)}
                </td>
                <td className='text-center uppercase font-semibold  pt-6 text-[8px] sm:text-xs md:text-sm lg:text-[10px] whitespace-nowrap'>
                  {item.vaccine_name.substr(0, 10)}
                </td>
                <td className='text-center uppercase font-semibold  pt-6 text-[8px] sm:text-xs md:text-sm lg:text-[10px] whitespace-nowrap'>
                  {item.status.substr(0, 10)}
                </td>
                <td className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2  place-content-center whitespace-nowrap pt-6 py-2 '>
                    <span className=' capitalize text-[13px] md:text-sm lg:text-[10px] lg:text-center underline underline-offset-1  cursor-pointer m-auto'><MdModeEditOutline onClick={()=>handleEdit(item.tagnumber, item.id)} className='text-green-500 text-lg'/></span>
                    <span className=' capitalize text-[13px] md:text-sm lg:text-[10px] lg:text-center underline underline-offset-1  cursor-pointer m-auto'><MdDelete onClick={()=>handleDelete(item.id)} className='text-red-500 text-lg' /></span>

                </td>
             </tr>
            })}
             {List.length == 0 && "No Data Yet"}
          
        </tbody>

       </table>
     

    )
}
