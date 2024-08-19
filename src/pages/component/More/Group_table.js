import React from 'react'
import Image from 'next/image';
import cattle from "../../image/cow.png";
import { MdModeEditOutline } from "react-icons/md";
import {useContext,useState, useEffect} from "react";
import { context } from '../context';
import { MdDelete } from "react-icons/md";
import { useRouter } from 'next/router';
export default function Group_table({ Data }) {
const router = useRouter();
const created = useContext(context)
const {Setcreated_tag, SetisHeading, SetaddAnimal,  Setmessage, message, Success, Setsuccess, Failure, Setfailure, Api_Connect, SetisisProcessing} = created
    
  const handleEdit =(id, uid)=>{
    Setcreated_tag(id)
    // localStorage.setItem('tagnumber', JSON.stringify(id))
    // localStorage.setItem('id', JSON.stringify(uid))
    // localStorage.setItem('editx', 'isedit')
    let object = {'tagnumber':id, 'id':uid, 'editx':'isedit'}
    localStorage.setItem('tagnumber', JSON.stringify(object))
    SetisHeading('Feed Management')
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
    let headers = {
        'Content-Type': 'application/json',
         'Accept': 'application/json',
    };


    // let formdata = new FormData();
    // formdata.append("id", id);
    // formdata.append("_method", 'delete');
    // let url = 'feeddelete';
    Api_Connect.get('/sanctum/csrf-cookie').then(() => {
        // Api_Connect.post(`/api/${url}`,formdata, {headers} )
        // .then(res => {
        //     console.log(res)
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
        let url = 'feeddelete/'+`${parseInt(id)}`;
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

        <table className='min-w-full'>
        <thead className=''>
           <tr className='w-full  uppercase text-sm leading-normal '>
           <th className='text-[#858D9D]  font-medium  capitalize text-[14px] md:text-sm lg:text-base text-center whitespace-nowrap'>Animal Type</th>
           <th className='text-[#858D9D]  font-medium  capitalize text-[14px] md:text-sm  lg:text-base  text-center whitespace-nowrap'>Tag</th>
           <th className='text-[#858D9D]  font-medium  capitalize text-[14px] md:text-sm  lg:text-base text-center whitespace-nowrap'>Health Status</th>
           <th className='text-[#858D9D]  font-medium  capitalize text-[14px] md:text-sm  lg:text-base text-center whitespace-nowrap'>feed type</th>
           <th className='text-[#858D9D]  font-medium  capitalize text-[14px] md:text-sm  lg:text-base text-center whitespace-nowrap'>Production type</th>
           <th className='text-[#858D9D]  font-medium  capitalize text-[14px] md:text-sm  lg:text-base text-center whitespace-nowrap'>ration </th>
           <th className='text-[#858D9D]  font-medium  capitalize text-[14px] md:text-sm  lg:text-base text-center whitespace-nowrap'>action </th>
           </tr>
        </thead>
        <tbody >
            {Data.length > 0&&Data.map((item, index)=>{
                return <tr key={index} className='w-full'>
                <td className='flex flex-row items-center justify-center pt-6' ><div className='flex flex-row items-center space-x-1 whitespace-nowrap'>
                  {/* <img src={item.feed_mgt.image?item.feed_mgt.image:cattle}  className=' rounded-full' /> */}
                  <p className='text-[13px] sm:text-xs md:text-sm lg:text-sm font-semibold'>{item.feed_mgt.name}</p></div> </td>
                <td className='text-center uppercase font-medium  pt-6 text-[13px] sm:text-xs md:text-sm lg:text-sm whitespace-nowrap'>
                 {item.feed_mgt.tag_id}
                </td>
                <td className='text-center uppercase font-medium  pt-6 text-[13px] sm:text-xs md:text-sm lg:text-sm whitespace-nowrap'>
                   {item.feed_mgt.health_status}
                </td>
                <td className='text-center uppercase font-semibold  pt-6 text-[13px] sm:text-xs md:text-sm lg:text-sm   w-20'>
                  {item.feedtype}
                </td>
                <td className='text-center uppercase font-semibold  pt-6 text-[13px] sm:text-xs md:text-sm lg:text-sm whitespace-nowrap px-10 lg:px-16'>
                  {item.producationtype}
                </td>
                <td className='text-center uppercase font-semibold  pt-6 text-[13px] sm:text-xs md:text-sm lg:text-sm whitespace-nowrap w-6 lg:pl-7'>
                  {item.ration}
                </td>
                <td className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2  place-content-center whitespace-nowrap pt-6 py-2 px-8'>
                    <span className=' capitalize text-[13px] md:text-sm lg:text-[10px] lg:text-center underline underline-offset-1  cursor-pointer m-auto'><MdModeEditOutline onClick={()=>handleEdit(item.tagnumber, item.id)} className='text-green-500 text-lg'/></span>
                    <span className=' capitalize text-[13px] md:text-sm lg:text-[10px] lg:text-center underline underline-offset-1  cursor-pointer m-auto'><MdDelete onClick={()=>handleDelete(item.id)} className='text-red-500 text-lg' /></span>

                </td>
             </tr>
            })}
             {Data.length == 0 && "No Data Yet"}
          
        </tbody>

       </table>
   
    )
}
