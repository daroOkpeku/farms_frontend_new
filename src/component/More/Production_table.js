import React,{useContext} from 'react'
import { context } from '../context';
import cattle from '../../image/cow.png'
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { useRouter } from 'next/router';
export default function Production_table({List, SetaddAnimal,  Setcreated_tag,  SetisHeading,  Setmessage,  Setfailure, SetisisProcessing, Setsuccess, SetClickonanilmal}) {
  const created = useContext(context)
  const { Api_Connect} = created
    const router = useRouter();

    const handleEdit =(id, uid)=>{
        Setcreated_tag(id)
        // localStorage.setItem('tagnumber', JSON.stringify(id))
        // localStorage.setItem('id', JSON.stringify(uid))
        // localStorage.setItem('editx', 'isedit')
        let object = {'tagnumber':id, 'id':uid, 'editx':'isedit'}
       window.localStorage.setItem('tagnumber', JSON.stringify(object))
        SetisHeading('Production Data')
        SetaddAnimal(true)
        SetClickonanilmal(false)
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
        let url = 'productiondelete/'+`${parseInt(id)}`;
        Api_Connect.get('/sanctum/csrf-cookie').then(() => {
   
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


    
    


      const ConvertDate = (date)=>{
        const dateObj = new Date(date);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = dateObj.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate
      }


    return (
        <div className='w-dvw sm:w-dvw md:w-full lg:w-full  rounded-md'>
        <table className=''>
        <thead className='border-b '>
           <tr className=''>
           <th className='text-[#858D9D]  font-medium  capitalize  text-sm sm:text-[9px] md:text-sm lg:text-sm text-center whitespace-nowrap'>Production Type</th>
           <th className='text-[#858D9D]  font-medium  capitalize text-sm sm:text-[9px] md:text-sm lg:text-sm  text-center whitespace-nowrap'>Tag</th>
           <th className='text-[#858D9D]  font-medium  capitalize text-sm sm:text-[9px] md:text-sm lg:text-sm text-center whitespace-nowrap'>Quantity</th>
           <th className='text-[#858D9D]  font-medium  capitalize text-sm sm:text-[9px] md:text-sm lg:text-sm text-center whitespace-nowrap'>weight</th>
           <th className='text-[#858D9D]  font-medium  capitalize text-sm sm:text-[9px] md:text-sm lg:text-sm text-center whitespace-nowrap'>Production Cycle</th>
           <th className='text-[#858D9D]  font-medium  capitalize text-sm sm:text-[9px] md:text-sm lg:text-sm text-center whitespace-nowrap'>Estrus Cycle Start date </th>
           <th className='text-[#858D9D]  font-medium  capitalize text-sm sm:text-[9px] md:text-sm lg:text-sm text-center whitespace-nowrap'> Estrus Cycle end date</th>
           <th className='text-[#858D9D]  font-medium  capitalize text-sm sm:text-[9px] md:text-sm lg:text-sm text-center whitespace-nowrap'> action</th>

           </tr>
        </thead>
        {/* {List.map((item, index)=><p key={index}>{item.production_type}, {item.tagnumber} {item.quantity} {item.weight} {item.production_cycle} {item.estrus_cycle_end_date}  {item.estrus_cycle_start_date} </p>)} */}
        <tbody className=''>
            {List.length &&List.map((item, index)=>{
              //  const image = item.image ? item.image:'https://ik.imagekit.io/9nikkw38wtz/no-pictures_fXzzro9jj.png?updatedAt=1724149999774';

                return <tr key={index} className='flex flex-row items-center justify-center pt-6'>
                <td className='flex flex-row items-center justify-center pt-6' >
                  <div className='flex flex-row items-center space-x-1 whitespace-nowrap'><p className='text-[6px] md:textbase lg:text-base font-semibold'>{item.production_type}</p></div> </td>
                <td className='text-center uppercase font-medium  pt-6 text-xs md:textbase lg:text-base whitespace-nowrap'>
                 {item.tagnumber}
                </td>
                <td className='text-center uppercase font-medium  pt-6 text-xs md:textbase lg:text-base whitespace-nowrap'>
                   {item.quantity}
                </td>
                <td className='text-center uppercase font-semibold  pt-6 text-xs md:textbase lg:text-base whitespace-nowrap'>
                  {item.weight}
                </td>
                <td className='text-center uppercase font-semibold  pt-6 text-xs md:textbase lg:text-base whitespace-nowrap'>
                  {item.production_cycle}
                </td>
                <td className='text-center uppercase font-semibold  pt-6 text-xs md:textbase lg:text-base whitespace-nowrap'>
                  {ConvertDate(item.estrus_cycle_start_date)}
                </td>
                <td className='text-center uppercase font-semibold  pt-6 text-xs md:textbase lg:text-base whitespace-nowrap'>
                  {ConvertDate(item.estrus_cycle_end_date)}
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
       </div>
    )
}
