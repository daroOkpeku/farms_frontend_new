import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function Financialrecord  ({
  Api_Connect,
  created_tag,
  Setsuccess,
  Success,
  Setfailure,
  Failure,
  Setcreated_tag,
  Setmessage,
  SetisisProcessing
})  {
  const [cost, Setcost] = useState("");
  const [revenue, Setrevenue] = useState("");
  const [current_value, Setcurrent_value] = useState("");
  const [yieldx, Setyieldx] = useState("");
  const [items, Setitems] = useState("");
  const [datex, Setdatex] = useState(new Date());
  const [production_type, Setproduction_type] = useState("");
  const [profit, Setprofit] = useState("");
  const [isedit, Setisedit] = useState(false)

  var idx = window.localStorage.getItem('tagnumber')?JSON.parse(window.localStorage.getItem('tagnumber')):"";

  useEffect(()=>{
   
    let headers = {
        "Content-Type": "application/json",
        'Accept': "application/json",
        "X-API-KEY": process.env.NEXT_PUBLIC_CODE
      };
      if(created_tag && idx && Object.keys(idx).length > 0){
        let urlv = "financialrecordsingle";
        Api_Connect.get("/sanctum/csrf-cookie").then(() => {
          Api_Connect.get(`/api/${urlv}/?tagnumber=`+created_tag+`&id=${idx.id}`, { headers }).then((res) => {
              if(res.data.success && Object.keys(res.data.success)){
                Setisedit(true)
                let obj = res.data.success
                Setcost(parseInt(obj.input_cost))
                Setrevenue(parseInt(obj.revenue))
                Setcurrent_value(parseInt(obj.current_value))
                Setyieldx(parseInt(obj.yield))
                Setitems(obj.items)
                Setdatex(new Date(obj.date_fin))
                Setproduction_type(obj.production_type)
                Setprofit(parseInt(obj.profit))
              }
          })
        })
      }
  },[Api_Connect, created_tag, idx])


  // SetisisProcessing(false)
  const handleClick = () => {
    SetisisProcessing(true)
    let headers = {
        "Content-Type": "application/json",
        'Accept': "application/json",
        "X-API-KEY": process.env.NEXT_PUBLIC_CODE
      };
      let formdata = new FormData();
      formdata.append("tagnumber", created_tag);
      formdata.append("production_type", production_type);
      formdata.append("date_fin", datex);
      formdata.append("items", items);
      formdata.append("input_cost", cost);
      formdata.append("yield", yieldx);
      formdata.append("current_value", current_value);
      formdata.append("revenue", revenue);
      formdata.append("profit", profit);
      let url = "financerecordcreate";
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
                }

        })
        .catch((err) => {
            let error = err.response.data.errors;
            if (error.tagnumber) {
              Setfailure(true);
              SetisisProcessing(false)
              Setmessage(error.tagnumber[0]);
            }
            else if (error.production_type) {
                Setfailure(true);
                SetisisProcessing(false)
                Setmessage(error.production_type[0]);
              }
              else if (error.date_fin) {
                Setfailure(true);
                SetisisProcessing(false)
                Setmessage(error.date_fin[0]);
              }
              else if (error.items) {
                Setfailure(true);
                SetisisProcessing(false)
                Setmessage(error.items[0]);
              }
              else if (error.input_cost) {
                Setfailure(true);
                SetisisProcessing(false)
                Setmessage(error.input_cost[0]);
              }
              else if (error.yield) {
                Setfailure(true);
                SetisisProcessing(false)
                Setmessage(error.yield[0]);
              }
              else if (error.current_value) {
                Setfailure(true);
                SetisisProcessing(false)
                Setmessage(error.current_value[0]);
              }
              else if (error.revenue) {
                Setfailure(true);
                SetisisProcessing(false)
                Setmessage(error.revenue[0]);
              }
              else if (error.profit) {
                Setfailure(true);
                SetisisProcessing(false)
                Setmessage(error.profit[0]);
              }
        })

      })

  };


  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 100);
  const maxDate = new Date();


  const handleEdit =()=>{
    SetisisProcessing(true)
    let headers = {
        "Content-Type": "application/json",
        'Accept': "application/json",
        "X-API-KEY": process.env.NEXT_PUBLIC_CODE
      };
      let formdata = new FormData();
      formdata.append("tagnumber", created_tag);
      formdata.append("production_type", production_type);
      formdata.append("date_fin", datex);
      formdata.append("items", items);
      formdata.append("input_cost", cost);
      formdata.append("yield", yieldx);
      formdata.append("current_value", current_value);
      formdata.append("revenue", revenue);
      formdata.append("profit", profit);
      formdata.append("id", idx.id)
      formdata.append('_method', 'put')
      let url = "financerecordedit";
      Api_Connect.get("/sanctum/csrf-cookie").then(() => {
        Api_Connect.post(`/api/${url}`, formdata, {headers} )
        .then((res) => {
            if(res.data.success){
                Setsuccess(true);
                SetisisProcessing(false)
                Setmessage(res.data.success);
                Setcreated_tag(res.data.tagnumber)
                }else if(res.data.error){
                  Setfailure(true);
                  SetisisProcessing(false)
                  Setmessage(res.data.error);
                }

        })
        .catch((err) => {
            let error = err.response.data.errors;
            if (error.tagnumber) {
              Setfailure(true);
              SetisisProcessing(false)
              Setmessage(error.tagnumber[0]);
            }
            else if (error.production_type) {
                Setfailure(true);
                SetisisProcessing(false)
                Setmessage(error.production_type[0]);
              }
              else if (error.date_fin) {
                Setfailure(true);
                SetisisProcessing(false)
                Setmessage(error.date_fin[0]);
              }
              else if (error.items) {
                Setfailure(true);
                SetisisProcessing(false)
                Setmessage(error.items[0]);
              }
              else if (error.input_cost) {
                Setfailure(true);
                SetisisProcessing(false)
                Setmessage(error.input_cost[0]);
              }
              else if (error.yield) {
                Setfailure(true);
                SetisisProcessing(false)
                Setmessage(error.yield[0]);
              }
              else if (error.current_value) {
                Setfailure(true);
                SetisisProcessing(false)
                Setmessage(error.current_value[0]);
              }
              else if (error.revenue) {
                Setfailure(true);
                SetisisProcessing(false)
                Setmessage(error.revenue[0]);
              }
              else if (error.profit) {
                Setfailure(true);
                SetisisProcessing(false)
                Setmessage(error.profit[0]);
              }
        })

      })


  }

  const handleBack = (e)=>{
    e.preventDefault();
    Setisedit(false)
    Setcost('')
    Setrevenue('')
    Setcurrent_value('')
    Setyieldx('')
    Setitems('')
    Setdatex(new Date())
    Setproduction_type('')
    Setprofit('')
  }
  return (
    <div>
      <div>
        <section className="bg-white lg:px-4 border-2 mt-4 rounded h-96 overflow-x-scroll scrollbar">
          <section className="w-full flex flex-col sm:flex sm:flex-col md:flex md:flex-col  lg:flex lg:flex-col px-2 lg:px-3 py-4">
            <div className="w-full flex flex-col sm:flex sm:flex-col md:flex md:flex-row md:space-x-3 lg:flex lg:flex-row lg:space-x-3 ">
              <section className="mt-4 w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2 gap-2">
                <span className="w-full text-left px-3 capitalize text-xs text-gray-600 pt-1">
                  Costs (feed, vet visits, labour)
                </span>
                <input
                  type="number"
                  value={cost}
                  onChange={(e) => Setcost(e.target.value)}
                  className="w-full px-3  border-none outline-none placeholder-custom placeholder:text-sm py-1"
                  placeholder="Placeholder"
                />
              </section>

              <section className="mt-4 w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2 gap-2">
                <span className="w-full text-left px-3 capitalize text-xs text-gray-600 pt-1">
                  Revenue (sale of animals, milk,{" "}
                </span>
                <input
                  type="number"
                  value={revenue}
                  onChange={(e) => Setrevenue(e.target.value)}
                  className="w-full px-3  border-none outline-none placeholder-custom placeholder:text-sm py-1"
                  placeholder="Placeholder"
                />
              </section>
            </div>

            <div className="w-full flex flex-col sm:flex sm:flex-col md:flex md:flex-row md:space-x-3 lg:flex lg:flex-row lg:space-x-3 ">
              <section className="mt-4 w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2 gap-2">
                <span className="w-full text-left px-3 capitalize text-xs text-gray-600 pt-1">
                  Current Value
                </span>
                <input
                  type="number"
                  value={current_value}
                  onChange={(e) => Setcurrent_value(e.target.value)}
                  className="w-full px-3  border-none outline-none placeholder-custom placeholder:text-sm py-1"
                  placeholder="Placeholder"
                />
              </section>

              <section className="mt-4 w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2 gap-2">
                <span className="w-full text-left px-3 capitalize text-xs text-gray-600 pt-1">
                  Yield{" "}
                </span>
                <input
                  type="number"
                  value={yieldx}
                  onChange={(e) => Setyieldx(e.target.value)}
                  className="w-full px-3  border-none outline-none placeholder-custom placeholder:text-sm py-1"
                  placeholder="Placeholder"
                />
              </section>
            </div>


            <div className="w-full flex flex-col sm:flex sm:flex-col md:flex md:flex-row md:space-x-3 lg:flex lg:flex-row lg:space-x-3 ">
              <section className="mt-4 w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2 gap-2">
                <span className="w-full text-left px-3 capitalize text-xs text-gray-600 pt-1">
                 Items
                </span>
                <input
                  type="text"
                  value={items}
                  onChange={(e) => Setitems(e.target.value)}
                  className="w-full px-3  border-none outline-none placeholder-custom placeholder:text-sm py-1"
                  placeholder="Enter items eg Feed Vaccination Treatment"
                />
              </section>

              <section className="mt-4 w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2 gap-2">
                <span className="w-full text-left px-3 capitalize text-xs text-gray-600 pt-1">
                  Date
                </span>
                {/* <input
                  type="number"
                  value={yieldx}
                  onChange={(e) => Setyieldx(e.target.value)}
                  className="w-full px-3  border-none outline-none placeholder-custom placeholder:text-sm py-1"
                  placeholder="Placeholder"
                /> */}
                    <DatePicker 
                  selected={datex} 
                  onChange={(date) =>Setdatex(date)} 
                  minDate={maxDate}
                //    maxDate={maxDate}
                //   filterDate={date => {
                //       const today = new Date();
                //       return date <= today;
                //   }}
                  // // Disable future dates
                  // showDisabledMonthNavigation
            highlightDates={[new Date()]}
                  className="w-full px-3  border-none outline-none placeholder-custom placeholder:text-sm"
                  />


              </section>
            </div>


            <div className="w-full flex flex-col sm:flex sm:flex-col md:flex md:flex-row md:space-x-3 lg:flex lg:flex-row lg:space-x-3 ">
              <section className="mt-4 w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2 gap-2">
                <span className="w-full text-left px-3 capitalize text-xs text-gray-600 pt-1">
                   Production Type
                </span>
                <input
                  type="text"
                  value={production_type}
                  onChange={(e) => Setproduction_type(e.target.value)}
                  className="w-full px-3  border-none outline-none placeholder-custom placeholder:text-sm py-1"
                  placeholder="Enter production Dairy Beef"
                />
              </section>

              <section className="mt-4 w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2 gap-2">
                <span className="w-full text-left px-3 capitalize text-xs text-gray-600 pt-1">
                Profit {" "}
                </span>
                <input
                  type="number"
                  value={profit}
                  onChange={(e) => Setprofit(e.target.value)}
                  className="w-full px-3  border-none outline-none placeholder-custom placeholder:text-sm py-1"
                  placeholder="Enter Profit"
                />
              </section>
            </div>







          </section>
          <div className="w-full">
            <section className="my-5 w-11/12 flex flex-col items-center border-[#CFD3D4] rounded-md pb-32">
            {isedit?
                 <div className="w-full flex flex-col gap-6 sm:w-full sm:flex sm:flex-col  sm:gap-6  md:w-full md:flex md:flex-row md:gap-6 lg:w-full  lg:flex lg:flex-row lg:gap-6">
                 <button
             onClick={(e)=>handleBack(e)}
             className="w-full py-2 bg-yellow-400 text-white rounded-md flex justify-center items-center space-x-1 border-none" >
             <h3 className="capitalize text-s">Create new data</h3>
           </button>
              <button
              onClick={handleEdit}
              className="w-full py-3 bg-[#4066C2] text-white rounded-md flex justify-center items-center space-x-1 border-none"
            >
              <h3 className="capitalize text-s">Edit and Continue</h3>
              <FaArrowRight className="text-sm" />
            </button>
            </div>
            :
                 <button
                 onClick={handleClick}
                 className="w-full py-3 bg-[#4066C2] text-white rounded-md flex justify-center items-center space-x-1 border-none"
               >
                 <h3 className="capitalize text-s">Save and Continue</h3>
                 <FaArrowRight className="text-sm" />
               </button>
            }
         
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};
