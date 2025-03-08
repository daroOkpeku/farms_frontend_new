import React, {useState, useEffect} from 'react'
import { FaArrowRight } from 'react-icons/fa6'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function Productiondata ({ Api_Connect, created_tag, Setsuccess, Success, Setfailure, Failure, Setcreated_tag, Setmessage, SetisisProcessing })  {

    const [daily_milk, Setdaily_milk] = useState("")
    // const [weight_gain, Setweight_gain] = useState("")
    const [production_type, Setproduction_type] = useState("")
    const [weight, Setweight] = useState("")
    const [proddate, Setproddate] = useState("")
    const [yieldx, Setyieldx] = useState("")
    const [production_cycle, Setproduction_cycle] = useState('')
    const [cost, Setcost] = useState("")
    const [disorders, Setdisorders] = useState("")
    const [estrus_cycle_start_date, Setestrus_cycle_start_date] = useState(new Date())
    const [estrus_cycle_end_date, Setestrus_cycle_end_date] = useState(new Date())
    const [quantity, Setquantity] = useState()
    const [isedit, Setisedit] = useState(false)
//     production_type
// weight
// date
// production_cycle
// yield
// cost
// disorders
// estrus_cycle_start_date
// estrus_cycle_end_date
var idx =  window.localStorage.getItem('tagnumber')?JSON.parse(window.localStorage.getItem('tagnumber')):"";
useEffect(()=>{

    let headers = {
        "Content-Type": "application/json",
        'Accept': "application/json",
        "X-API-KEY": process.env.NEXT_PUBLIC_CODE
      };
      if(idx && Object.keys(idx).length > 0 && idx.tagnumber){
        let url = `productionsingle/?tagnumber=`+idx.tagnumber+`&id=${idx.id}`;
        Api_Connect.get("/sanctum/csrf-cookie").then(() => {
            Api_Connect.get(`/api/${url}`, {headers} )
                .then((res) => {
                    console.log(res)
                   
                    if(res.data.success && Object.keys(res.data.success)){
                      Setisedit(true)
                        Setproddate(new Date(res.data.success.date_of_producation))
                        Setweight(res.data.success.weight )
                        Setcost(parseInt(res.data.success.cost))
                        Setdisorders(res.data.success.disorders )
                        Setyieldx(parseInt(res.data.success.yield))
                        Setproduction_cycle(res.data.success.production_cycle)
                        Setestrus_cycle_start_date( new Date(res.data.success.estrus_cycle_start_date))
                        Setestrus_cycle_end_date(new Date(res.data.success.estrus_cycle_end_date))
                        Setquantity(res.data.success.quantity)
    
                    }
    
                })
    
        })

      }


},[Api_Connect, created_tag, idx])
// SetisisProcessing(false)
const minDate = new Date();
minDate.setFullYear(minDate.getFullYear() - 100);
const maxDate = new Date();
    const handleClick =()=>{
      SetisisProcessing(true)
        let headers = {
            "Content-Type": "application/json",
            'Accept': "application/json",
            "X-API-KEY": process.env.NEXT_PUBLIC_CODE
          };
        let formdata = new FormData()
        formdata.append('production_type', production_type)
        formdata.append('weight', weight)
        formdata.append('date', proddate)
        formdata.append('production_cycle', production_cycle)
        formdata.append('yield', yieldx)
        formdata.append('cost', cost)
        formdata.append('disorders', disorders)
        formdata.append('estrus_cycle_start_date', estrus_cycle_start_date)
        formdata.append('estrus_cycle_end_date', estrus_cycle_end_date)
        formdata.append('quantity', quantity)
        formdata.append('tagnumber', created_tag)
        let url = "productioncreate";
        Api_Connect.get("/sanctum/csrf-cookie").then(() => {
            Api_Connect.post(`/api/${url}`, formdata, {headers} )
            .then((res) => {
              if(res.data.success){
                Setsuccess(true);
                SetisisProcessing(false)
                Setmessage(res.data.success);
                Setcreated_tag(res.data.tagnumber)
                // localStorage.setItem('tagnumber', JSON.stringify(res.data.tagnumber))
                // localStorage.setItem('id', JSON.stringify(res.data.id))
                if(idx && idx.editx){
                  let object = {'tagnumber':res.data.tagnumber, 'id':res.data.id, 'editx':'isedit'}
                 window.localStorage.setItem('tagnumber', JSON.stringify(object))
                }else{
                  let object = {'tagnumber':res.data.tagnumber, 'id':res.data.id, 'editx':''}
                 window.localStorage.setItem('tagnumber', JSON.stringify(object))
                }
                }else if(res.data.error){
                  Setfailure(true);
                  SetisisProcessing(false)
                  Setmessage(res.data.error);
                  Setisedit(false)
                }
            })
            .catch((err) => {
                let error = err.response.data.errors;
                if (error.production_type) {
                  Setfailure(true);
                  SetisisProcessing(false)
                  Setmessage(error.production_type[0]);
                }
                else if (error.weight) {
                    Setfailure(true);
                    SetisisProcessing(false)
                    Setmessage(error.weight[0]);
                  }
                  else if (error.date) {
                    Setfailure(true);
                    SetisisProcessing(false)
                    Setmessage(error.date[0]);
                  }
                  else if (error.production_cycle) {
                    Setfailure(true);
                    SetisisProcessing(false)
                    Setmessage(error.production_cycle[0]);
                  }
                  else if (error.yield) {
                    Setfailure(true);
                    SetisisProcessing(false)
                    Setmessage(error.yield[0]);
                  }
                  else if (error.cost) {
                    Setfailure(true);
                    SetisisProcessing(false)
                    Setmessage(error.cost[0]);
                  }
                  else if (error.disorders) {
                    Setfailure(true);
                    SetisisProcessing(false)
                    Setmessage(error.disorders[0]);
                  }
                  else if (error.estrus_cycle_start_date) {
                    Setfailure(true);
                    SetisisProcessing(false)
                    Setmessage(error.estrus_cycle_start_date[0]);
                  }
                  else if (error.estrus_cycle_end_date) {
                    Setfailure(true);
                    SetisisProcessing(false)
                    Setmessage(error.estrus_cycle_end_date[0]);
                  }
                  else if (error.quantity) {
                    Setfailure(true);
                    SetisisProcessing(false)
                    Setmessage(error.quantity[0]);
                  }

            })
            

        })
       
    }



  const handleEdit =()=>{
    SetisisProcessing(true)
    let headers = {
        "Content-Type": "application/json",
        'Accept': "application/json",
        "X-API-KEY": process.env.NEXT_PUBLIC_CODE
      };
    let formdata = new FormData()
    formdata.append('production_type', production_type)
    formdata.append('weight', weight)
    formdata.append('date', proddate)
    formdata.append('production_cycle', production_cycle)
    formdata.append('yield', yieldx)
    formdata.append('cost', cost)
    formdata.append('disorders', disorders)
    formdata.append('estrus_cycle_start_date', estrus_cycle_start_date)
    formdata.append('estrus_cycle_end_date', estrus_cycle_end_date)
    formdata.append('quantity', quantity)
    formdata.append('tagnumber', created_tag)
    formdata.append('id', idx.id)
    formdata.append('_method', 'put')
    let url = "productionedit";
    Api_Connect.get("/sanctum/csrf-cookie").then(() => {
        Api_Connect.post(`/api/${url}`, formdata, {headers} )
        .then((res) => {
          if(res.data.success){
            Setsuccess(true);
            SetisisProcessing(false)
            Setmessage(res.data.success);
            Setcreated_tag(res.data.tagnumber)
            // localStorage.setItem('tagnumber', JSON.stringify(res.data.tagnumber))
            }else if(res.data.error){
              Setfailure(true);
              SetisisProcessing(false)
              Setmessage(res.data.error);
            }
        })
        .catch((err) => {
            let error = err.response.data.errors;
            if (error.production_type) {
              Setfailure(true);
              SetisisProcessing(false)
              Setmessage(error.production_type[0]);
            }
            else if (error.weight) {
                Setfailure(true);
                SetisisProcessing(false)
                Setmessage(error.weight[0]);
              }
              else if (error.date) {
                Setfailure(true);
                SetisisProcessing(false)
                Setmessage(error.date[0]);
              }
              else if (error.production_cycle) {
                Setfailure(true);
                SetisisProcessing(false)
                Setmessage(error.production_cycle[0]);
              }
              else if (error.yield) {
                Setfailure(true);
                SetisisProcessing(false)
                Setmessage(error.yield[0]);
              }
              else if (error.cost) {
                Setfailure(true);
                SetisisProcessing(false)
                Setmessage(error.cost[0]);
              }
              else if (error.disorders) {
                Setfailure(true);
                SetisisProcessing(false)
                Setmessage(error.disorders[0]);
              }
              else if (error.estrus_cycle_start_date) {
                Setfailure(true);
                SetisisProcessing(false)
                Setmessage(error.estrus_cycle_start_date[0]);
              }
              else if (error.estrus_cycle_end_date) {
                Setfailure(true);
                SetisisProcessing(false)
                Setmessage(error.estrus_cycle_end_date[0]);
              }
              else if (error.quantity) {
                Setfailure(true);
                SetisisProcessing(false)
                Setmessage(error.quantity[0]);
              }

        })
        

    })


  }


  const handleBack = (e)=>{
    e.preventDefault();
    Setisedit(false)
    Setproddate(new Date())
    Setweight('')
    Setcost('')
    Setdisorders('')
    Setyieldx('')
    Setproduction_cycle('')
    Setestrus_cycle_start_date( new Date())
    Setestrus_cycle_end_date(new Date())
    Setquantity('')
    
  }


    return (
        <div>
            <div>


                <section className='bg-white lg:px-4 border-2 mt-4 rounded h-96 overflow-x-scroll scrollbar'>

                    <div className='w-full flex flex-col sm:flex sm:flex-col md:flex md:flex-row md:space-x-3 lg:flex lg:flex-row lg:space-x-3'>
                      
                           

                            <section className='mt-4 w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2  flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2 gap-2'>
                                <span className='w-full text-left px-3 capitalize text-xs text-gray-600 pt-1'>Production Date</span>
                                                        <DatePicker 
                                        selected={proddate} 
                                        onChange={(date) =>Setproddate(date)} 
                                        minDate={maxDate}
                                        // maxDate={maxDate}
                                        // filterDate={date => {
                                        //     const today = new Date();
                                        //     return date <= today;
                                        // }}
                                        // // Disable future dates
                                        // showDisabledMonthNavigation
                                         highlightDates={[new Date()]}
                                        
                                        className="w-full px-3  border-none outline-none placeholder-custom placeholder:text-sm"
                                        />                           
                                 </section>

                       
                       
                            <section className='mt-4 w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2 gap-2'>
                                <span className='w-full text-left px-3 capitalize text-xs text-gray-600 pt-1'>Weight </span>
                                <input type='text'  value={weight}  onChange={(e)=>Setweight(e.target.value)} className='w-full px-3 py-1 border-none outline-none placeholder-custom placeholder:text-sm' placeholder='EnterWeight' />
                            </section>
                       
                    </div>


                 

                    

                     <div className='w-full flex flex-col sm:flex sm:flex-col md:flex md:flex-row md:space-x-3 lg:flex lg:flex-row lg:space-x-3'>
                       
                      <section className='mt-4 w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2  flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2 gap-2'>
                          <span className='w-full text-left px-3 capitalize text-xs text-gray-600 pt-1'>Cost</span>
                              <input type='number' value={cost} onChange={(e)=>Setcost(e.target.value)}   placeholder="Enter Production Type eg Dairy Beef" className='w-full px-3 py-1  border-none outline-none placeholder-custom placeholder:text-sm'  />
                      </section>

                 
                 
                      <section className='mt-4 w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2 gap-2'>
                          <span className='w-full text-left px-3 capitalize text-xs text-gray-600 pt-1'>Disorders</span>
                          <input type='text'  value={disorders}  onChange={(e)=>Setdisorders(e.target.value)} className='w-full px-3 py-1 border-none outline-none placeholder-custom placeholder:text-sm' placeholder='Placeholder' />
                      </section>
                 
                     </div>

                     

                     
                     <div className='w-full flex flex-col sm:flex sm:flex-col md:flex md:flex-row md:space-x-3 lg:flex lg:flex-row lg:space-x-3'>
                       
                      <section className='mt-4 w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2  flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2 gap-2'>
                          <span className='w-full text-left px-3 capitalize text-xs text-gray-600 pt-1'>Yield</span>
                              <input type='number' value={yieldx} onChange={(e)=>Setyieldx(e.target.value)}   placeholder="Enter Production Type eg Dairy Beef" className='w-full px-3 py-1  border-none outline-none placeholder-custom placeholder:text-sm'  />
                      </section>

                 
                 
                      <section className='mt-4 w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2 gap-2'>
                          <span className='w-full text-left px-3 capitalize text-xs text-gray-600 pt-1'>Production Cycle</span>
                          <input type='text'  value={production_cycle}  onChange={(e)=>Setproduction_cycle(e.target.value)} className='w-full px-3 py-1 border-none outline-none placeholder-custom placeholder:text-sm' placeholder='Placeholder' />
                      </section>
                 
                     </div>
                     {/*  // Setestrus_cycle_start_date Setestrus_cycle_end_date */}

                     <div className='w-full flex flex-col sm:flex sm:flex-col md:flex md:flex-row md:space-x-3 lg:flex lg:flex-row lg:space-x-3'>
                       
                       <section className='mt-4 w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2  flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2 gap-2'>
                           <span className='w-full text-left px-3 capitalize text-xs text-gray-600 pt-1'>Estrus Cycle(Start Date)</span>
                                        <DatePicker 
                                        selected={estrus_cycle_start_date} 
                                        onChange={(date) =>Setestrus_cycle_start_date(date)} 
                                        minDate={maxDate}
                                        // maxDate={maxDate}
                                        // filterDate={date => {
                                        //     const today = new Date();
                                        //     return date <= today;
                                        // }}
                                        // // Disable future dates
                                        // showDisabledMonthNavigation
                                         highlightDates={[new Date()]}
                                        
                                        className="w-full px-3  border-none outline-none placeholder-custom placeholder:text-sm"
                                        />  
                       </section>
 
                  
                  
                       <section className='mt-4 w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2 gap-2'>
                           <span className='w-full text-left px-3 capitalize text-xs text-gray-600 pt-1'>Estrus Cycle(End Date)</span>
                                        <DatePicker 
                                        selected={estrus_cycle_end_date} 
                                        onChange={(date) =>Setestrus_cycle_end_date(date)} 
                                        minDate={new Date(estrus_cycle_start_date)}
                                        // maxDate={maxDate}
                                        // filterDate={date => {
                                        //     const today = new Date();
                                        //     return date <= today;
                                        // }}
                                        // // Disable future dates
                                        // showDisabledMonthNavigation
                                         highlightDates={[new Date()]}
                                        
                                        className="w-full px-3  border-none outline-none placeholder-custom placeholder:text-sm"
                                        />                         </section>
                  
                      </div>
                      <div className='w-full flex flex-col sm:flex sm:flex-col md:flex md:flex-row md:space-x-3 lg:flex lg:flex-row lg:space-x-3'>
                      
                           

                      <section className='mt-4 w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2  flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2 gap-2'>
                          <span className='w-full text-left px-3 capitalize text-xs text-gray-600 pt-1'>Production type</span>
                              <input type='text' value={production_type} onChange={(e)=>Setproduction_type(e.target.value)}   placeholder="Enter Production Type eg Dairy Beef" className='w-full px-3 py-1  border-none outline-none placeholder-custom placeholder:text-sm'  />
                      </section>

                 
                 
                      <section className='mt-4 w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2 gap-2'>
                          <span className='w-full text-left px-3 capitalize text-xs text-gray-600 pt-1'>Quantity </span>
                          <input type='number'  value={quantity}  onChange={(e)=>Setquantity(e.target.value)} className='w-full px-3 py-1 border-none outline-none placeholder-custom placeholder:text-sm' placeholder='Placeholder' />
                      </section>
                 
                     </div>

                    <div className='w-full'>
                    <section className='my-5 w-11/12 flex flex-col items-center border-[#CFD3D4] rounded-md pb-32'>
                    {isedit?
                      <div className="w-full flex flex-col gap-6 sm:w-full sm:flex sm:flex-col sm:gap-6  md:w-full md:flex md:flex-row md:gap-6 lg:w-full  lg:flex lg:flex-row lg:gap-6">
                      <button
                  onClick={(e)=>handleBack(e)}
                  className="w-full py-2 bg-yellow-400 text-white rounded-md flex justify-center items-center space-x-1 border-none" >
                  <h3 className="capitalize text-s">Create new data</h3>
                </button>
                      <button onClick={handleEdit} className='w-full py-3 bg-[#4066C2] text-white rounded-md flex justify-center items-center space-x-1 border-none'>
                      <h3 className='capitalize text-s'>Edit and Continue</h3>
                      <FaArrowRight className='text-sm' />
                  </button>
                  </div>
                    :
                       <button onClick={handleClick} className='w-full py-3 bg-[#4066C2] text-white rounded-md flex justify-center items-center space-x-1 border-none'>
                       <h3 className='capitalize text-s'>Save and Continue</h3>
                       <FaArrowRight className='text-sm' />
                   </button>
                    }
                             
                            </section>
                    </div>

                </section>
            </div>
            </div>
    )
}


