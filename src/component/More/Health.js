import React, {useState, useEffect} from 'react';
import Select from 'react-select'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa6'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function Health  ({  Api_Connect, created_tag, Setsuccess, Success, Setfailure, Failure, Setcreated_tag, Setmessage, SetisisProcessing  })  {
  const [vacation_date, SetVacation_date] = useState(new Date())
  const [treatments, Settreatments] = useState("")
  const [treatmentsdate, Settreatmentsdate] = useState(new Date())
  const [illness, Setillness] = useState("")
  const [vet_visit, Setvet_visit] = useState("")
  const [vacationlist, Setvacationlist] = useState([]);
  const [vaccine_name, Setvaccine_name] = useState("")
  const [dose, Setdose] = useState("")
  const [cost, Setcost] = useState("")
  const [treated_vcn_num,  Settreated_vcn_num] = useState("")
  const [status, Setstatus] = useState("")
  const [isedit, Setisedit] = useState(false)
  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "none", // Remove the border
      boxShadow: "none", // Remove the box shadow
      "&:hover": {
        border: "none", // Remove the border on hover
      },
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "lightgrey" : "white",
      color: "black",
      "&:hover": {
        backgroundColor: "lightgrey",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#b1bdcb",
      fontSize: "15px",
      fontWeight: "500",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "black",
      fontSize: "0.75rem",
      color: "#a0aec0",
    }),
  };

  var idx = window.localStorage.getItem('tagnumber')?JSON.parse(window.localStorage.getItem('tagnumber')):"";

  useEffect(()=>{
    let headers = {
      "Content-Type": "application/json",
      'Accept': "application/json",
      "X-API-KEY": process.env.NEXT_PUBLIC_CODE
    };
    let url = "vaccinelist";
    Api_Connect.get("/sanctum/csrf-cookie").then(() => {
      Api_Connect.get(`/api/${url}`, { headers }).then((res) => {
        let data = res.data.success
        let datalist = [];

        data.map((item)=>{
          let son = { value:item, label:item }
          datalist.push(son)
        })
        // console.log(datalist)
        Setvacationlist(datalist)


      })

    })
//  healthlist
var idxx = window.localStorage.getItem('tagnumber')?JSON.parse(window.localStorage.getItem('tagnumber')):"";

if(idxx && Object.keys(idxx).length > 0 && idx.tagnumber){
  let urlv = "healthlist";
Api_Connect.get("/sanctum/csrf-cookie").then(() => {
  Api_Connect.get(`/api/${urlv}/?tagnumber=`+idx.tagnumber+`&id=${idxx.id}`, { headers }).then((res) => {
   console.log(res.data.success)
   if(res.data.success && Object.keys(res.data.success).length > 0){
    Setisedit(true)
    SetVacation_date(res.data.success.vacation_date)
   let obj = {value:res.data.success.vaccine_name, label:res.data.success.vaccine_name}
    Setvaccine_name(obj)
    Settreatments(res.data.success.treatments)
    Settreatmentsdate(res.data.success.treatments_date)
    Setdose(res.data.success.dose)
    Setillness(res.data.success.illness)
    Setcost(parseInt(res.data.success.cost))
    Settreated_vcn_num(res.data.success.treated_by_vcn_number)
    Setstatus(res.data.success.status)
   }

  })

})
}



  },[Api_Connect, created_tag, idx.tagnumber])

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
    let formdata = new FormData();
    formdata.append("vacation_date", vacation_date);
    formdata.append('tagnumber', created_tag)
    formdata.append('vaccine_name', vaccine_name.value)
    formdata.append('treatments', treatments)
    formdata.append('treatments_date', treatmentsdate)
    formdata.append('illness', illness)
    formdata.append('dose', dose)
    formdata.append('cost', cost)
    formdata.append('treated_by_vcn_number', treated_vcn_num)
    formdata.append('status', status)
    let url = "healthrecord_create";
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
      }).catch((err) => {
        let error = err.response.data.errors;
        if (error.vacation_date) {
          Setfailure(true);
          SetisisProcessing(false)
          Setmessage(error.vacation_date[0]);
        } else if (error.tagnumber) {
          Setfailure(true);
          SetisisProcessing(false)
          Setmessage(error.tagnumber[0]);
        }else if (error.vaccine_name) {
          Setfailure(true);
          SetisisProcessing(false)
          Setmessage(error.vaccine_name[0]);
        }else if (error.treatments) {
          Setfailure(true);
          SetisisProcessing(false)
          Setmessage(error.treatments[0]);
        }else if (error.treatments_date) {
          Setfailure(true);
          SetisisProcessing(false)
          Setmessage(error.treatments_date[0]);
        }
        else if (error.illness) {
          Setfailure(true);
          SetisisProcessing(false)
          Setmessage(error.illness[0]);
        }
        else if (error.dose) {
          Setfailure(true);
          SetisisProcessing(false)
          Setmessage(error.dose[0]);
        }
        else if (error.cost) {
          Setfailure(true);
          SetisisProcessing(false)
          Setmessage(error.cost[0]);
        }
        else if (error.treated_by_vcn_number) {
          Setfailure(true);
          SetisisProcessing(false)
          Setmessage(error.treated_by_vcn_number[0]);
        }
        else if (error.status) {
          Setfailure(true);
          SetisisProcessing(false)
          Setmessage(error.status[0]);
        }
      })


    })



  }



  const handleEdit = ()=>{
    SetisisProcessing(true)
    let headers = {
      "Content-Type": "application/json",
      'Accept': "application/json",
      "X-API-KEY": process.env.NEXT_PUBLIC_CODE
    };
    let formdata = new FormData();
    formdata.append("vacation_date", vacation_date);
    formdata.append('tagnumber', created_tag)
    formdata.append('vaccine_name', vaccine_name.value)
    formdata.append('treatments', treatments)
    formdata.append('treatments_date', treatmentsdate)
    formdata.append('illness', illness)
    formdata.append('dose', dose)
    formdata.append('cost', cost)
    formdata.append('treated_by_vcn_number', treated_vcn_num)
    formdata.append('status', status)
    formdata.append('id', idx.id)
    formdata.append('_method', 'put')
    let url = "healthedit";
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
      }).catch((err) => {
        let error = err.response.data.errors;
        if (error.vacation_date) {
          Setfailure(true);
          SetisisProcessing(false)
          Setmessage(error.vacation_date[0]);
        } else if (error.tagnumber) {
          Setfailure(true);
          SetisisProcessing(false)
          Setmessage(error.tagnumber[0]);
        }else if (error.vaccine_name) {
          Setfailure(true);
          SetisisProcessing(false)
          Setmessage(error.vaccine_name[0]);
        }else if (error.treatments) {
          Setfailure(true);
          SetisisProcessing(false)
          Setmessage(error.treatments[0]);
        }else if (error.treatments_date) {
          Setfailure(true);
          SetisisProcessing(false)
          Setmessage(error.treatments_date[0]);
        }
        else if (error.illness) {
          Setfailure(true);
          SetisisProcessing(false)
          Setmessage(error.illness[0]);
        }
        else if (error.dose) {
          Setfailure(true);
          SetisisProcessing(false)
          Setmessage(error.dose[0]);
        }
        else if (error.cost) {
          Setfailure(true);
          SetisisProcessing(false)
          Setmessage(error.cost[0]);
        }
        else if (error.treated_by_vcn_number) {
          Setfailure(true);
          SetisisProcessing(false)
          Setmessage(error.treated_by_vcn_number[0]);
        }
        else if (error.status) {
          Setfailure(true);
          SetisisProcessing(false)
          Setmessage(error.status[0]);
        }
      })


    })




  }

  const handleBack = (e)=>{
    e.preventDefault();
    Setisedit(false)
    SetVacation_date('')
    let obj = {value:'', label:''}
     Setvaccine_name(obj)
     Settreatments('')
     Settreatmentsdate('')
     Setdose('')
     Setillness('')
     Setcost('')
     Settreated_vcn_num('')
     Setstatus('')
  }


  return (
    <div> 
    <div>


    <section className='bg-white lg:px-4 border-2 mt-4 rounded h-96 overflow-x-scroll scrollbar'>

      <div className='w-full flex flex-col sm:flex sm:flex-col md:flex md:flex-col  lg:flex lg:flex-col px-2 lg:px-3 py-4'>
        <div className='w-full flex flex-col sm:flex sm:flex-col md:flex md:flex-row md:space-x-3 lg:flex lg:flex-row lg:space-x-3 '>

        <section className='mt-4 w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2'>
            <span className='w-full text-left px-3 capitalize text-xs text-gray-600 pt-1'>Vacation date</span>
            {/* <input type='date' value={vacation_date} onChange={(e)=>SetVacation_date(e.target.value)} className='w-full px-3  border-none outline-none placeholder-custom placeholder:text-sm'  /> */}
            <DatePicker 
                  selected={vacation_date} 
                  onChange={(date) =>SetVacation_date(date)} 
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

          <section className='mt-4 w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2'>
            <span className='w-full text-left px-3 capitalize text-xs text-gray-600 pt-1'>vaccine name</span>
            {/* <input type='text' value={vaccine_name} onChange={(e)=>Setvaccine_name(e.target.value)}  placeholder='Enter Vaccine Name' className='w-full px-3  border-none outline-none placeholder-custom placeholder:text-sm'  /> */}
            <Select
                  className="w-[100%] outline-none border-none placeholder-custom placeholder:text-base"
                  value={vaccine_name}
                  onChange={(e) => Setvaccine_name(e)}
                  options={vacationlist}
                  styles={customStyles}
                  placeholder="Select Vaccine Name"
                />
          </section>
       
    
        </div>

        <div className='w-full flex flex-col sm:flex sm:flex-col md:flex md:flex-row md:space-x-3 lg:flex lg:flex-row lg:space-x-3'>
{/* dose */}
   <section className='mt-4 w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2  flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2'>
            <span className='w-full text-left px-3 capitalize text-xs text-gray-600 pt-1'>Treatments</span>
                <input type='text' value={treatments} onChange={(e)=>Settreatments(e.target.value)}  placeholder='Enter Vaccine Name' className='w-full px-3  border-none outline-none placeholder-custom placeholder:text-sm'  />
          </section>


   
          <section className='mt-4 w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2'>
            <span className='w-full text-left px-3 capitalize text-xs text-gray-600 pt-1'>Treatments date</span>
            <DatePicker 
                  selected={treatmentsdate} 
                  onChange={(date) =>Settreatmentsdate(date)} 
                  minDate={maxDate}
            highlightDates={[new Date()]}
                  className="w-full px-3  border-none outline-none placeholder-custom placeholder:text-sm"
                  />
          </section>

{/* 
          <section className='mt-4 w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2'>
            <span className='w-full text-left px-3 capitalize text-xs text-gray-600 pt-1'>dose</span>
            <input type='date' value={vaccine_name} onChange={(e)=>Setdose(e.target.value)} className='w-full px-3  border-none outline-none placeholder-custom placeholder:text-sm'  />
          </section> */}

         
        </div>


        <div className='w-full flex flex-col sm:flex sm:flex-col md:flex md:flex-row md:space-x-3 lg:flex lg:flex-row lg:space-x-3'>

        <section className='mt-4 w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2'>
            <span className='w-full text-left px-3 capitalize text-xs text-gray-600 pt-1'>dose</span>
            <input type='text' value={dose} onChange={(e)=>Setdose(e.target.value)} className='w-full px-3  border-none outline-none placeholder-custom placeholder:text-sm'  />
          </section>
        
          <section className='mt-4  w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2'>
            <span className='w-full text-left px-3 capitalize text-xs text-gray-600 pt-1'>Illness</span>
            <input type='text' value={illness} onChange={(e)=>Setillness(e.target.value)} className='w-full px-3  border-none outline-none placeholder-custom placeholder:text-sm' placeholder='Enter Illness' />
          </section>
         
          {/* <section className='mt-4  w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2'>
            <span className='w-full text-left px-3 capitalize text-xs text-gray-600 pt-1'>Vet visits</span>
            <input type='text' className='w-full px-3  border-none outline-none placeholder-custom placeholder:text-sm' placeholder='Enter Vet visit' />
          </section> */}

       
        </div>

        <div className='w-full flex flex-col sm:flex sm:flex-col md:flex md:flex-row md:space-x-3 lg:flex lg:flex-row lg:space-x-3'>

        <section className='mt-4  w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2'>
            <span className='w-full text-left px-3 capitalize text-xs text-gray-600 pt-1'>Cost</span>
            <input type='number' value={cost}  onChange={(e)=>Setcost(e.target.value)} className='w-full px-3  border-none outline-none placeholder-custom placeholder:text-sm' placeholder='Enter Cost' />
          </section>

          <section className='mt-4  w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2'>
            <span className='w-full text-left px-3 capitalize text-xs text-gray-600 pt-1'>Treated by(VCN Number)</span>
            <input type='text'  value={treated_vcn_num} onChange={(e)=>Settreated_vcn_num(e.target.value)} className='w-full px-3  border-none outline-none placeholder-custom placeholder:text-sm' placeholder='Enter Vet visit' />
          </section>


        </div>

        <div className='w-full flex flex-col sm:flex sm:flex-col md:flex md:flex-row md:space-x-3 lg:flex lg:flex-row lg:space-x-3'>
        <section className='mt-4  w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2'>
            <span className='w-full text-left px-3 capitalize text-xs text-gray-600 pt-1'>Status</span>
            <input type='text' value={status}  onChange={(e)=>Setstatus(e.target.value)} className='w-full px-3  border-none outline-none placeholder-custom placeholder:text-sm' placeholder='Enter Cost' />
          </section>
         </div>

        <div className='w-full'>
        <section className='my-5 w-11/12 flex flex-col items-center border-[#CFD3D4] rounded-md '>
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
      </div>
     
    </section>
  </div></div>
  )
}
