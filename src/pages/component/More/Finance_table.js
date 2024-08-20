import React from 'react';
import cattle from "../../image/cow.png"
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { useRouter } from 'next/router';
import Image from 'next/image';
export default function Finance_table({List, Api_Connect,  SetisHeading,  Setcreated_tag,  SetaddAnimal,  Setmessage, Setsuccess, Setfailure, SetisisProcessing}) {
    const router = useRouter();

    const data = [
        {
            img:cattle,
            animal:"Cattle",
            unique:"UKN 1245566677",
            profit:"N20,000",
            expenditure:"N10,000",
        },
        {
            img:cattle,
            animal:"Cattle",
            unique:"UKN 1245566677",
            profit:"N20,000",
            expenditure:"N10,000",
        },
        {
            img:cattle,
            animal:"Cattle",
            unique:"UKN 1245566677",
            profit:"N20,000",
            expenditure:"N10,000",
        },
        {
            img:cattle,
            animal:"Cattle",
            unique:"UKN 1245566677",
            profit:"N20,000",
            expenditure:"N10,000",
        },
        {
            img:cattle,
            animal:"Cattle",
            unique:"UKN 1245566677",
            profit:"N20,000",
            expenditure:"N10,000",
        },
        {
            img:cattle,
            animal:"Cattle",
            unique:"UKN 1245566677",
            profit:"N20,000",
            expenditure:"N10,000",
        },
    ]
    const handleEdit =(id, uid)=>{
        Setcreated_tag(id)
        // localStorage.setItem('tagnumber', JSON.stringify(id))
        // localStorage.setItem('id', JSON.stringify(uid))
        // localStorage.setItem('editx', 'isedit')
        let object = {'tagnumber':id, 'id':uid, 'editx':'isedit'}
        localStorage.setItem('tagnumber', JSON.stringify(object))
        SetisHeading('Financial Record')
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
        SetisisProcessing(true)
        // let headers = {
        //     'Content-Type': 'application/json',
        //      'Accept': 'application/json',
        // };
    
    
        // let formdata = new FormData();
        // formdata.append("id", id);
        // formdata.append("_method", 'delete');
        // let url = 'financedelete';
        Api_Connect.get('/sanctum/csrf-cookie').then(() => {
            let url = 'financedelete/'+`${parseInt(id)}`;
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

    <table className='min-w-full '>
    <thead className=''>
       <tr className='w-full  uppercase text-sm leading-normal '>
       <th className='text-[#858D9D]  font-medium  capitalize text-[8px] sm:text-[9px] md:text-sm lg:text-sm  text-center whitespace-nowrap '>Animal type</th>
       <th className='text-[#858D9D]  font-medium  capitalize text-[8px] sm:text-[9px] md:text-sm lg:text-sm   text-center whitespace-nowrap'>number</th>
       <th className='text-[#858D9D]  font-medium  capitalize text-[8px] sm:text-[9px] md:text-sm lg:text-sm text-center whitespace-nowrap'>profit</th>
       <th className='text-[#858D9D]  font-medium  capitalize text-[8px] sm:text-[9px] md:text-sm lg:text-sm  text-center whitespace-nowrap'>expenditure</th>
       <th className='text-[#858D9D]  font-medium  capitalize text-[8px] sm:text-[9px] md:text-sm lg:text-sm  text-center whitespace-nowrap'>yield</th>
       <th className='text-[#858D9D]  font-medium  capitalize text-[8px] sm:text-[9px] md:text-sm lg:text-sm text-center whitespace-nowrap'>Action</th>
       </tr>
    </thead>
    <tbody>
            {List.length&& List.map((item, index)=>{
              const image = item.image ? item.image:'https://ik.imagekit.io/9nikkw38wtz/no-pictures_fXzzro9jj.png?updatedAt=1724149999774';

                return <tr key={index} className='w-full'>
                <td className='flex flex-row items-center justify-center pt-6' >
                <div className='w-6 h-6 sm:w-6 sm:h-6 md:w-9 md:h-9 lg:w-9  lg:h-9  rounded-full'>
                    <img src={image} alt='img' className='object-cover rounded-full h-full w-full' />
                  </div>
                  <div className='flex flex-row items-center space-x-1 whitespace-nowrap'><p className='text-[6px] md:textbase lg:text-base font-semibold'>{item.finance_connect?.name}</p></div>
                   </td>
                <td className='text-center uppercase font-medium  pt-6 text-[6px] md:textbase lg:text-base whitespace-nowrap '>
                 {item.tagnumber}
                </td>
                <td className='text-center uppercase font-medium  pt-6 text-[6px] md:textbase lg:text-base whitespace-nowrap '>
                   {item.profit}
                </td>
                <td className='text-center uppercase font-semibold  pt-6 text-[6px] md:textbase lg:text-base whitespace-nowrap '>
                  {item.revenue}
                </td>
                <td className='text-center uppercase font-semibold  pt-6 text-[6px] md:textbase lg:text-base whitespace-nowrap'>
                  {item.yield}
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
