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
  <div className='lg:w-2/3 w-full bg-white p-4 mt-2 px-6  rounded-md  overflow-x-scroll scrollbar  h-72'>
  <h2 className='font-bold text-lg'>Recent Animals</h2>
  <table className='min-w-full'>
    <thead className=''>
      <tr className='w-full  uppercase text-xs leading-normal'>
        <th className='text-[#858D9D] text-[13px] md:text-sm lg:text-sm font-medium text-center'>Animal Type</th>
        <th className='text-[#858D9D] text-[13px] md:text-sm lg:text-sm font-medium text-center'>Unique ID</th>
        <th className='text-[#858D9D] text-[13px] md:text-sm lg:text-sm font-medium text-center'>Health Status</th>
        <th className='text-[#858D9D] text-[13px] md:text-sm lg:text-sm font-medium text-center'>Weight</th>
      </tr>
    </thead>
    <tbody className="">
      {Datal.length > 0 ? (
        Datal.map((item, index) => {
          const image = item.image ? item.image.replace('//uploads', '/uploads') : cattle;
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

