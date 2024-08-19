import React,{useEffect, useState} from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

function Pie({Api_Connect}) {

  const data = {
    labels: ["male", "female"],
    datasets: [
        {
            label: 'Votes',
            data:[35, 65],
            backgroundColor: [
                'rgb(255, 255, 0)',
                'rgb(0, 0, 255)',
             
            ],
            // borderColor: [
            //     'rgba(255, 99, 132, 1)',
            //     'rgba(54, 162, 235, 1)',
            //     'rgba(255, 206, 86, 1)',
            //     'rgba(75, 192, 192, 1)',
            //     'rgba(153, 102, 255, 1)',
            //     'rgba(255, 159, 64, 1)',
            // ],
            borderWidth: 0,
        },
    ],
};

  const [Datax, setDatax] = useState(data);
  const [total, setTotal] = useState(0)

  useEffect(()=>{
     
    let headers = {
        'Content-Type': 'application/json',
         'Accept': 'application/json',
    };
    let url = 'gender';
    Api_Connect.get('/sanctum/csrf-cookie').then(() => {
        Api_Connect.get(`/api/${url}`, { headers })
            .then(res => {
              if(res.data.success){
                // setDatax(res.data.success)
                setTotal(res.data.total)
                const data = {
                  labels: ["male", "female"],
                  datasets: [
                      {
                          label: 'Votes',
                          data:res.data.success,
                          backgroundColor: [
                              'rgb(255, 255, 0)',
                              'rgb(0, 0, 255)',
                           
                          ],
                        
                          borderWidth: 0,
                      },
                  ],
              };

              setDatax(data)



              }
                
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }).catch(error => {
        console.error('Error fetching CSRF cookie:', error);
    });




},[Api_Connect])



 

const options = {
  plugins: {
      legend: {
          display: true,
          position: 'top',
      },
      tooltip: {
          enabled: true,
      },
  },
  responsive: true,
  maintainAspectRatio: false,
};

  return (
    <div className='bg-white   mt-2 py-2 px-2  '>
       <span className='w-full'>
       <h2 className='font-bold text-lg'>Gender</h2>
       </span>
        <div className='w-full mt-5'>
     
        <Doughnut  data={Datax} options={options} />
          </div>
          <article className='w-full flex  items-center justify-center '>
          <p className='items-center'>{total} Animal Total</p>
          </article>
    </div>
  )
}

export default Pie