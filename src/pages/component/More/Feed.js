import React, { useState, useEffect } from "react";
import Select from "react-select";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function Feed  ({
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
  const [select_Sex, Setselect_Sex] = useState(null);
  const [feed, Setfeed] = useState("");
  const [feedlist, Setfeedlist] = useState("");
  const [feed_type, Setfeed_type] = useState("");
  const [feeding_schedule, Setfeeding_schedule] = useState(new Date());
  const [qtyList, SetQtylist] = useState([{ value:"", label:"" }])
  const [costList, SetcostList] = useState([{ value:"", label:"" }])
  const [quanity_fed, Setquanity_fed] = useState("");
  const [cost, Setcost] = useState("");
  const [edit, Setedit] = useState(false);
  const [editFeedid, SeteditFeedid] = useState("")
  const [ProdType, SetProdType] = useState("")
  const [Ration, SetRation] = useState(0)
  const [ration_composition, Setration_composition] = useState("")
  const [disorders, Setdisorders] = useState('')
  const [feeddetail, Setfeeddetail] = useState('')
  // const option_sex = [
  //   { value: "Male", label: "Male" },
  //   { value: "Female", label: "Female" },
  // ];
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
 var uid = localStorage.getItem('tagnumber')?JSON.parse(localStorage.getItem('tagnumber')):"";
  useEffect(() => {
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    // animalfeeddata
    let url = "animalfeeddata";
    Api_Connect.get("/sanctum/csrf-cookie").then(() => {
      Api_Connect.get(`/api/${url}`, { headers }).then((res) => {
        let datalist = res.data.success;
        let arrunique = [];
      
        datalist.map((item) => {
         
         let textnew = [...new Set(item.map((i)=>i.animal_name))] 
          // + "(" + one.feed_name + ")"

          let feed_typedata = item.map((t)=>{
            // console.log(t.animal_name)
            // d.replace(/\s+/g, "")
            t.feed_type.map((d)=>{
              let son = { value:t.animal_name+"(" + d + ")" , label:t.animal_name+"(" + d + ")" }
              arrunique.push(son);
            })
          })

         
        
              
        //   let dataxc = item.map((one) => one.animal_name )
           
        //   let feeddata = [...new Set(item.map((one) => one.feed_name))];
        //   // console.log("answer", dataxc);
        //  let son = { value:feeddata[0].replace(/\s+/g, ""), label:dataxc[0] }
          // arrunique.push(son);
        });
       console.log(arrunique)
        Setfeedlist(arrunique);

        // make change
        let quantity_kg = [];
        let cost_kg = []
        datalist.map((item) => {
         
          // item.map((one) => {
          // // console.log(one)
          //  if (one.feed_name.replace(/\s+/g, "")  == feed.value) {
             
          //    let son = { value:one.quantity_kg, label:one.quantity_kg }
          //    quantity_kg.push(son)

          //    let price = { value:one.cost_naira, label:one.cost_naira }
          //   //  cost_kg.push(price)
          //   }
          // });


          item.map((t)=>{
            // console.log(t)
            // t.feed_type.map((d)=>{
            //   // let son = { value:d.quantity_kg, label:t.quantity_kg }
            //   // quantity_kg.push(son);
            //   let price = { value:d.cost_naira, label:d.cost_naira }
            //   cost_kg.push(price)
            // }) 
            let testunq = { value:t.quantity_kg, label:t.quantity_kg }
            quantity_kg.push(testunq)

            let price = { value:t.cost_naira, label:t.cost_naira }
            cost_kg.push(price)

          })


          SetQtylist(quantity_kg)
          SetcostList(cost_kg)
          // make change

        });


      });
    });


    var idx = localStorage.getItem('tagnumber')?JSON.parse(localStorage.getItem('tagnumber')):"";
    // let object = {'tagnumber':res.data.tagnumber, 'id':res.data.id, 'editx':''}
    // localStorage.setItem('tagnumber', JSON.stringify(object))
    if(created_tag && idx && Object.keys(idx).length > 0 && idx.id){
      let urlz = "feeddetailsget";
      Api_Connect.get("/sanctum/csrf-cookie").then(() => {
        Api_Connect.get(`/api/${urlz}/?tagnumber=`+created_tag+`&id=${idx.id}`, { headers })
          .then((res) => {
             //console.log('jwjhwej',res)
            if (res.data.success) {
           
  
              
                Setedit(true)
                let dataeach = res.data.success
                console.log(dataeach)
             SeteditFeedid(dataeach.feedid)
             // console.log(dataeach)
             let feedans = {value:dataeach.feedtype, label:dataeach.feedtype}
             Setfeed(feedans)
             let anstime = new Date(dataeach.feed_connection.date_of_feeding)
              Setfeeding_schedule(anstime)
             let qtyans =  {value:dataeach.feed_connection.quantity, label:dataeach.feed_connection.quantity }
             Setquanity_fed(qtyans)
             let costans = {value:dataeach.cost, label:dataeach.cost}
              Setcost(costans)
              Setfeeddetail(dataeach.feeddetails)
              Setdisorders(dataeach.disorders)
              Setration_composition(dataeach.ration_composition)
              SetRation(parseInt(dataeach.ration))
              SetProdType(dataeach.producationtype)
              
             
            
            }else{
              Setedit(false)
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      });

    }
 





  }, [Api_Connect,  created_tag]);
  // SetisisProcessing(false)
  const handleClick = () => {
    SetisisProcessing(true)
  //  console.log(created_tag,  feeding_schedule, quanity_fed.label, cost.label)

    let headers = {
      "Content-Type": "application/json",
      'Accept': "application/json",
    };

 

    let formdata = new FormData();
    formdata.append("tagnumber", created_tag);
    formdata.append("feedtype", feed.value);
    formdata.append("schedule", feeding_schedule);
    formdata.append("qty", quanity_fed.label);
    formdata.append("cost", cost.label);
    formdata.append('producationtype', ProdType)
    formdata.append('ration', Ration)
    formdata.append('ration_composition', ration_composition)
    formdata.append('disorders', disorders)
    formdata.append('feeddetail', feeddetail)
    let url = "feedcreate";
    Api_Connect.get("/sanctum/csrf-cookie").then(() => {
      Api_Connect.post(`/api/${url}`, formdata, {headers} )
        .then((res) => {
            if(res.data.success){
              Setsuccess(true);
              SetisisProcessing(false)
              Setmessage(res.data.success);
              Setcreated_tag(res.data.tagnumber)
              // localStorage.setItem('tagnumber', JSON.stringify(res.data.tagnumber))
              //     // id
              // localStorage.setItem('id', JSON.stringify(res.data.id))
              if(idx && idx.editx){
                let object = {'tagnumber':res.data.tagnumber, 'id':res.data.id, 'editx':'isedit'}
                localStorage.setItem('tagnumber', JSON.stringify(object))
              }else{
                let object = {'tagnumber':res.data.tagnumber, 'id':res.data.id, 'editx':''}
                localStorage.setItem('tagnumber', JSON.stringify(object))
              }
          }else if(res.data.error){
            Setfailure(true);
            SetisisProcessing(false)
            Setmessage(res.data.error);
            Setedit(false)
          }
        }).catch((err) => {
          let error = err.response.data.errors;
          if (error.tagnumber) {
            Setfailure(true);
            SetisisProcessing(false)
            Setmessage(error.tagnumber[0]);
          } else if (error.feedtype) {
            Setfailure(true);
            SetisisProcessing(false)
            Setmessage(error.feedtype[0]);
          }else if (error.schedule) {
            Setfailure(true);
            SetisisProcessing(false)
            Setmessage(error.schedule[0]);
          }else if (error.qty) {
            Setfailure(true);
            SetisisProcessing(false)
            Setmessage(error.qty[0]);
          }else if (error.cost) {
            Setfailure(true);
            SetisisProcessing(false)
            Setmessage(error.cost[0]);
          }else if (error.producationtype) {
            Setfailure(true);
            SetisisProcessing(false)
            Setmessage(error.producationtype[0]);
          }else if (error.ration) {
            Setfailure(true);
            SetisisProcessing(false)
            Setmessage(error.ration[0]);
          }else if (error.ration_composition) {
            Setfailure(true);
            SetisisProcessing(false)
            Setmessage(error.ration_composition[0]);
          }else if (error.disorders) {
            Setfailure(true);
            SetisisProcessing(false)
            Setmessage(error.disorders[0]);
          }else if (error.feeddetail) {
            Setfailure(true);
            SetisisProcessing(false)
            Setmessage(error.feeddetail[0]);
          }

        })
    })


  };
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 100);

  // Current date
  const maxDate = new Date();

  const handleEdit =()=>{
    SetisisProcessing(true)
    let headers = {
      "Content-Type": "application/json",
      'Accept': "application/json",
    };

    let formdata = new FormData();
    formdata.append("tagnumber", created_tag);
    formdata.append("feedtype", feed.value);
    formdata.append("schedule", feeding_schedule)
    formdata.append("qty", quanity_fed.label)
    formdata.append("cost", cost.label)
    formdata.append('feedid', editFeedid)
    formdata.append('producationtype', ProdType)
    formdata.append('ration', Ration)
    formdata.append('ration_composition', ration_composition)
    formdata.append('disorders', disorders)
    formdata.append('feeddetail', feeddetail)
    formdata.append('id', uid.id);
    formdata.append('_method', 'put')
    let url = "feededit";
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
        if (error.tagnumber) {
          Setfailure(true);
          SetisisProcessing(false)
          Setmessage(error.tagnumber[0]);
        } else if (error.feedtype) {
          Setfailure(true);
          SetisisProcessing(false)
          Setmessage(error.feedtype[0]);
        }else if (error.schedule) {
          Setfailure(true);
          SetisisProcessing(false)
          Setmessage(error.schedule[0]);
        }else if (error.qty) {
          Setfailure(true);
          SetisisProcessing(false)
          Setmessage(error.qty[0]);
        }else if (error.cost) {
          Setfailure(true);
          SetisisProcessing(false)
          Setmessage(error.cost[0]);
        }else if (error.producationtype) {
          Setfailure(true);
          SetisisProcessing(false)
          Setmessage(error.producationtype[0]);
        }else if (error.ration) {
          Setfailure(true);
          Setmessage(error.ration[0]);
          SetisisProcessing(false)
        }else if (error.ration_composition) {
          Setfailure(true);
          SetisisProcessing(false)
          Setmessage(error.ration_composition[0]);
        }else if (error.disorders) {
          Setfailure(true);
          SetisisProcessing(false)
          Setmessage(error.disorders[0]);
        }else if (error.feeddetail) {
          Setfailure(true);
          SetisisProcessing(false)
          Setmessage(error.feeddetail[0]);
        }

      })


    })

  }

  const handleBack = (e)=>{
    e.preventDefault();
    Setedit(false)
    let feedans = {value:'', label:''}
    Setfeed(feedans)
    let anstime = new Date()
    Setfeeding_schedule(anstime)
    let qtyans =  {value:'', label:''}
    Setquanity_fed(qtyans)
    let costans = {value:'', label:''}
    Setcost(costans)

    Setfeeddetail('')
    Setdisorders('')
    Setration_composition('')
    SetRation('')
    SetProdType('')
    }


  return (
    <div>
      <div>
        <section className="bg-white px-4 border-2 mt-4 rounded h-96 overflow-x-scroll scrollbar">
          <div className="w-full flex flex-col sm:flex sm:flex-col md:flex md:flex-col  lg:flex lg:flex-col px-2 lg:px-3 py-4'">

            <div className="w-full flex flex-col sm:flex sm:flex-col md:flex md:flex-row md:space-x-3 lg:flex lg:flex-row lg:space-x-3 ">

              <section className="mt-4 w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2">
                <span className="w-full text-left px-3 capitalize text-xs text-gray-600 pt-1">
                  Feed type
                </span>
                <Select
                  className="w-[100%] outline-none border-none"
                  value={feed}
                  onChange={(e) =>Setfeed(e)}
                  options={feedlist}
                  styles={customStyles}
                  placeholder="Select Sex here "
                />
              </section>
              <section className="mt-4 w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2">
                <span className="w-full text-left px-3 capitalize text-xs text-gray-600 pt-1">
                  Feeding schedule
                </span>
                  <DatePicker 
                  selected={feeding_schedule} 
                  onChange={(date) =>Setfeeding_schedule(date)} 
                  minDate={maxDate}
            // maxDate={maxDate}
            // filterDate={date => {
            //     const today = new Date();
            //     return date <= today;
            // }}
            // Disable future dates
            showDisabledMonthNavigation
            highlightDates={[new Date()]}
                  className="w-full px-3  border-none outline-none placeholder-custom placeholder:text-sm"
                  />
              </section>
            </div>


            <div className="w-full flex flex-col sm:flex sm:flex-col md:flex md:flex-row md:space-x-3 lg:flex lg:flex-row lg:space-x-3 ">

            <section className="mt-4 w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2">
                <span className="w-full text-left px-3 capitalize text-xs text-gray-600 pt-1">
                  Production Type
                </span>
                 <input
                  type="text"
                  value={ProdType}
                  onChange={(e) => SetProdType(e.target.value)}
                  className="w-full px-3  border-none outline-none placeholder-custom placeholder:text-sm"
                  placeholder="Enter Production Type e.g Dairy, Beef"
                />
                 </section>
                 {/* Ration  */}

                 <section className="mt-4 w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2">
                <span className="w-full text-left px-3 capitalize text-xs text-gray-600 pt-1">
                 Ration
                </span>
                 <input
                  type="number"
                  value={Ration}
                  onChange={(e)=>SetRation(e.target.value)}
                  className="w-full px-3  border-none outline-none placeholder-custom placeholder:text-sm"
                  placeholder="Enter Ration Percentage"
                />
                 </section>
            </div>


            <div className="w-full flex flex-col sm:flex sm:flex-col md:flex md:flex-row md:space-x-3 lg:flex lg:flex-row lg:space-x-3 ">
                {/* Setration_composition  Disorders  Setdisorders*/}
                <section className="mt-4 w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2">
                <span className="w-full text-left px-3 capitalize text-xs text-gray-600 pt-1">
                  Ration Composition
                </span>
                 <input
                  type="text"
                  value={ration_composition}
                  onChange={(e) => Setration_composition(e.target.value)}
                  className="w-full px-3  border-none outline-none placeholder-custom placeholder:text-sm"
                  placeholder="Enter Ration Composition"
                />
                 </section>


                 <section className="mt-4 w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2">
                <span className="w-full text-left px-3 capitalize text-xs text-gray-600 pt-1">
                Disorders
                </span>
                 <input
                  type="text"
                  value={disorders}
                  onChange={(e) => Setdisorders(e.target.value)}
                  className="w-full px-3  border-none outline-none placeholder-custom placeholder:text-sm"
                  placeholder="Enter Ration Composition"
                />
                 </section>

            </div>





            <div className="w-full flex flex-col sm:flex sm:flex-col md:flex md:flex-row md:space-x-3 lg:flex lg:flex-row lg:space-x-3">
              <section className="mt-4 w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2">
                <span className="w-full text-left px-3 capitalize text-xs text-gray-600 pt-1">
                  Quanity feed
                </span>
                  <Select
                  className="w-[100%] outline-none border-none"
                  value={quanity_fed}
                  onChange={(e) => Setquanity_fed(e)}
                  options={qtyList}
                  styles={customStyles}
                  placeholder="Select Sex here "
                />
              </section>

              <section className="mt-4 w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2">
                <span className="w-full text-left px-3 capitalize text-xs text-gray-600 pt-1">
                  Cost
                </span>
                <Select
                  className="w-[100%] outline-none border-none"
                  value={cost}
                  onChange={(e) =>Setcost(e)}
                  options={costList}
                  styles={customStyles}
                  placeholder="Select Sex here "
                />
              </section>    
            </div>

            {/* feeddetails */}
            <div className="w-full flex flex-col sm:flex sm:flex-col md:flex md:flex-row md:space-x-3 lg:flex lg:flex-row lg:space-x-3">
            <section className="mt-4 w-11/12  sm:w-11/12 md:w-1/2 lg:w-1/2 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md pb-2">
            <span className="w-full text-left px-3 capitalize text-xs text-gray-600 pt-1">
                 feeddetails
                </span>
                <textarea
                value={feeddetail}
                onChange={(e)=>Setfeeddetail(e.target.value)}
                className="w-[100%] outline-none border-none"
                >

                </textarea>
            </section>


              </div>
    

            <div className="w-full">
            <section className="my-5 w-11/12 flex flex-col items-center border-[#CFD3D4] rounded-md ">
              {edit?
               <div className="w-full flex flex-col gap-6 sm:w-full sm:flex sm:flex-col sm:gap-6  md:w-full md:flex md:flex-row md:gap-6 lg:w-full  lg:flex lg:flex-row lg:gap-6">
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


          </div>
        </section>
      </div>
    </div>
  );
};

