import React, {useEffect, useState} from "react";
import { CiCalendar } from "react-icons/ci";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function Chart({Api_Connect}) {
  const [data, setData] = useState([])
  // const data = [
  //   {
  //     name: "Sep",
  //     profit: 4000,
  //     loss: 2400,
  //     amt: 2400,
  //   },
  //   {
  //     name: "Oct",
  //     profit: 3000,
  //     loss: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: "Nov",
  //     profit: 2000,
  //     loss: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: "Dec",
  //     profit: 2780,
  //     loss: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: "Jan",
  //     profit: 1890,
  //     loss: 4800,
  //     amt: 2181,
  //   },
  //   {
  //     name: "Feb",
  //     profit: 2390,
  //     loss: 3800,
  //     amt: 2500,
  //   },
  //   {
  //     name: "Mar",
  //     profit: 3490,
  //     loss: 4300,
  //     amt: 2100,
  //   },
  // ];


  useEffect(()=>{

    let headers = {
       'Content-Type': 'application/json',
        'Accept': 'application/json',
   };
   let url = 'profile_and_loss';
   Api_Connect.get('/sanctum/csrf-cookie').then(() => {
       Api_Connect.get(`/api/${url}`, { headers })
           .then(res => {
            // console.log(res)
             if(res.data.success){
              setData(res.data.success)
             }
               
           })
           .catch(error => {
               console.error('Error fetching data:', error);
           });
   }).catch(error => {
       console.error('Error fetching CSRF cookie:', error);
   });

 },[Api_Connect])

  
// console.log(data)
  return (
    <div className="w-full flex flex-col bg-white py-2 px-2">
      <article className="w-full flex flex-row justify-between py-2 px-2">
        <h2 className="capitalize font-semibold text-base">Profit & Revenue</h2>
        <span className="flex flex-row items-center space-x-2 px-2 border">
          <CiCalendar />
          <h2 className="font-medium capitalize">weekly</h2>
        </span>
      </article>
        
        {data.length > 0?
           <section className="w-full mt-4 ">
           <ResponsiveContainer width="100%" height={250}>
             {/* <BarChart
               data={data}
               margin={{
                 top: 5,
                 right: 30,
                 left: 40,
                 bottom: 5,
               }}
             >
            <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis dataKey="month" />
          <Tooltip />
          <Legend />
          <Bar dataKey="loss" stackId="a" fill="#8884d8" />
          <Bar dataKey="profit" stackId="a" fill="#82ca9d" />
             </BarChart> */}
              <BarChart
                data={data}
           margin={{
            top: 5,
            right: 30,
            left: 40,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis dataKey="" />
          <Tooltip />
          <Legend />
          <Bar dataKey="loss" fill="#8884d8" activeBar={<Rectangle  stroke="blue" />} />
          <Bar dataKey="profit" fill="#82ca9d" activeBar={<Rectangle  stroke="purple" />} />
        </BarChart>
           </ResponsiveContainer>
         </section>
        
        :
        <section className="w-full mt-4 text-center grid place-content-center capitalize text-lg  font-bold h-60">
          no data yet
        </section>
        }
   


    </div>
  );
}
