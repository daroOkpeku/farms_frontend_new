import React,{useEffect, useState} from 'react';
import Table from './Table';
import cattle from "../../image/cow.png"
export default  function Recent({Api_Connect}) {

    // const data = [
    //     {
    //         img:cattle,
    //         animal:"Cattle",
    //         unique:"UKN 1245566677",
    //         age:"22",
    //         weight:"20kg",
    //         status:"Permanent",
    //     },
    //     {
    //         img:cattle,
    //         animal:"Cattle",
    //         unique:"UKN 1245566677",
    //         age:"22",
    //         weight:"20kg",
    //         status:"Permanent",
    //     },
    //     {
    //         img:cattle,
    //         animal:"Cattle",
    //         unique:"UKN 1245566677",
    //         age:"22",
    //         weight:"20kg",
    //         status:"Permanent",
    //     },
    //     {
    //         img:cattle,
    //         animal:"Cattle",
    //         unique:"UKN 1245566677",
    //         age:"22",
    //         weight:"20kg",
    //         status:"Permanent",
    //     },
    //     {
    //         img:cattle,
    //         animal:"Cattle",
    //         unique:"UKN 1245566677",
    //         age:"22",
    //         weight:"20kg",
    //         status:"Permanent",
    //     },
    //     {
    //         img:cattle,
    //         animal:"Cattle",
    //         unique:"UKN 1245566677",
    //         age:"22",
    //         weight:"20kg",
    //         status:"Permanent",
    //     },
    // ]

  const [Datal, setData] = useState([])
    useEffect(()=>{
     if(Datal.length == 0){
      let headers = {
        'Content-Type': 'application/json',
         'Accept': 'application/json',
         "X-API-KEY": process.env.NEXT_PUBLIC_CODE
    };
    let url = 'animaldata';
    Api_Connect.get('/sanctum/csrf-cookie').then(() => {
        Api_Connect.get(`/api/${url}`, { headers })
            .then(res => {
              if(res.data.data){
               setData(res.data.data)
              }
                
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }).catch(error => {
        console.error('Error fetching CSRF cookie:', error);
    });

     }
       

    },[Api_Connect, Datal.length ]);
    
  return (
  <div className=' w-full h-52 sm:w-full sm:h-52 md:w-2/3 md:h-72 lg:w-2/3 lg:h-72 bg-white p-4 mt-2 px-6  rounded-md   overflow-y-scroll scrollbar  '>
  <h2 className='font-bold text-sm sm:text-sm md:text-lg lg:text-lg'>Recent Animals</h2>
  <table className='w-dvw sm:w-dvw md:w-full lg:w-full'>
    {/* min-w-full */}
    <thead className=''>
      <tr className='w-full  uppercase text-xs leading-normal'>
        <th className='text-[#858D9D] text-sm sm:text-[9px] md:text-sm lg:text-sm font-medium text-center'>Animal Type</th>
        <th className='text-[#858D9D] text-sm sm:text-[9px] md:text-sm lg:text-sm font-medium text-center'>Unique ID</th>
        <th className='text-[#858D9D] text-sm sm:text-[9px] md:text-sm lg:text-sm font-medium text-center'>Health Status</th>
        <th className='text-[#858D9D] text-sm sm:text-[9px] md:text-sm lg:text-sm font-medium text-center'>Weight</th>
      </tr>
    </thead>
    <tbody className="">
      {Datal.length > 0 ? (
        Datal.map((item, index) => {
          const image = item.image ? item.image.replace('//uploads', '/uploads'):'https://ik.imagekit.io/9nikkw38wtz/no-pictures_fXzzro9jj.png?updatedAt=1724149999774';

          return (
            <Table
          
              key={index}
              img={image}
              animal={item.name}
              unique={item.tag_id}
              age={item.health_status}
              weight={item.weight}
            />
          );
        })
      ) : (
        <tr>
          <td colSpan={4} className='text-center'>No Data Yet</td>
        </tr>
      )}
    </tbody>
  </table>
</div>

  )
}

