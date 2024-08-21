import React, { use, useState, useEffect } from "react";
import Select from "react-select";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
export default  function Animalrecords  ({
  Api_Connect,
  Setsuccess,
  Success,
  Setfailure,
  Failure,
  Setmessage,
  Setcreated_tag,
  created_tag,
  editId, 
  SetaddAnimal,
  SetisisProcessing
}) {
  const [select_Sex, Setselect_Sex] = useState(null);
  const [farmList, SetfarmList] = useState([]);
  const [breedList, SetbreedList] = useState([]);
  const [farmname, Setfarmname] = useState(null);
  const [animal_name, Setanimal_name] = useState("");
  const [breed, Setbreed] = useState("");
  const [weight, SetWeight] = useState("");
  const [status, Setstatus] = useState("");
  const [tag_id, Settag_id] = useState("");
  const [age, Setage] = useState("");
  const [health, Sethealth] = useState("");
  const [breeding_health, Setbreeding_health] = useState("");
  const [percentage, Setpercentage] = useState("");
  const [isEdit, SetisEdit] = useState(false)
  const option_sex = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];
console.log(Failure)
  // url farmnames
  // 'animal_name',
  // 'sex',
  // 'image',
  // 'age',
  // 'breed',
  // 'weight',
  // 'tag_id',
  // 'health_status',
  // 'farm_farmid'
   console.log(created_tag)
  const option_status = [
    { value: "Permanent", label: "Permanent" },
    { value: "Temporary", label: "Temporary" },
  ];

  const health_status = [
    { value: "Healthy", label: "Healthy" },
    { value: "UnHealthy", label: "UnHealthy" },
  ];

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
      fontSize: "10px",
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
  useEffect(() => {
    let headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    };
    let url = "farmnames";
    Api_Connect.get("/sanctum/csrf-cookie").then(() => {
      Api_Connect.get(`/api/${url}`, { headers })
        .then((res) => {
          if (res.data.success) {
            let list = res.data.success.map((item) => {
              return { value: item, label: item };
            });

            SetfarmList(list);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    });

    // breednames

    let urlx = "breednames";
    Api_Connect.get("/sanctum/csrf-cookie").then(() => {
      Api_Connect.get(`/api/${urlx}`, { headers })
        .then((res) => {
          if (res.data.success) {
            let list = res.data.success.map((item) => {
              return { value: item, label: item };
            });

            SetbreedList(list);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    });
    var idxx = window.localStorage.getItem('tagnumber')?JSON.parse(window.localStorage.getItem('tagnumber')):"";

    // animaldetailsget
    if(created_tag && idxx && Object.keys(idxx).length > 0 && idxx.tagnumber != ""){
      let urlz = "animaldetailsget";
      Api_Connect.get("/sanctum/csrf-cookie").then(() => {
        Api_Connect.get(`/api/${urlz}/?tagnumber=`+created_tag+`&id=${idxx.id}`, { headers })
          .then((res) => {
            if (res.data.success) {
              let dataeach = res.data.success
              //  console.log(res)
                SetisEdit(true)
               let farmobj = {value:dataeach.farm_connect.farmname, label:dataeach.farm_connect.farmname}
               let breedobj = {value:dataeach.breed, label:dataeach.breed}
               let sexobj = {value:dataeach.sex, label:dataeach.sex}
               let healthobj = {value:dataeach.health_status, label:dataeach.health_status}
               Setfarmname(farmobj)
               Setanimal_name(dataeach.name)
               Setbreed(breedobj)
               SetWeight(dataeach.weight)
               Setselect_Sex(sexobj)
               Settag_id(dataeach.tag_id)
               Setage(dataeach.age)
               Sethealth(healthobj)
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      });
  

    }else{
      SetisEdit(false)
    }

    // let isupdate = Failure == false?true:false
    // SetisEdit(isupdate)

  }, [Api_Connect, created_tag, Failure]);

  const handleClick = (e) => {
    e.preventDefault();
    SetisisProcessing(true)
    let formdata = new FormData();
    formdata.append("farmname", farmname.value);
    formdata.append("animal_name", animal_name);
    formdata.append("breed", breed.value);
    formdata.append("tagnumber", tag_id);
    formdata.append("sex", select_Sex.value);
    formdata.append("age", parseInt(age));
    formdata.append("weight", weight);
    formdata.append("health_status", health.value);
    let headers = {
      "Content-Type": "application/json",
      'Accept': "application/json",
    };
    let url = "animaldetails";
    Api_Connect.get("/sanctum/csrf-cookie").then(() => {
      Api_Connect.post(`/api/${url}`, formdata, {headers} )
        .then((res) => {
          console.log(res)
          if (res.data.success) {
            Setsuccess(true);
            Setmessage(res.data.success);
            Setcreated_tag(res.data.tagnumber)
            // localStorage.setItem('tagnumber', JSON.stringify(res.data.tagnumber))
            SetisisProcessing(false)
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
            Setmessage(res.data.error);
            SetisisProcessing(false)
            SetisEdit(false)
          }
        })
        .catch((err) => {
          let error = err.response.data.errors;
          if (error.farmname) {
            Setfailure(true);
            Setmessage(error.farmname[0]);
            SetisisProcessing(false)
          } else if (error.animal_name) {
            Setfailure(true);
            Setmessage(error.animal_name[0]);
            SetisisProcessing(false)
          } else if (error.breed) {
            Setfailure(true);
            Setmessage(error.breed[0]);
            SetisisProcessing(false)
          } else if (error.tagnumber) {
            Setfailure(true);
            Setmessage(error.tagnumber[0]);
            SetisisProcessing(false)
          } else if (error.sex) {
            Setfailure(true);
            Setmessage(error.sex[0]);
            SetisisProcessing(false)
          } else if (error.age) {
            Setfailure(true);
            Setmessage(error.age[0]);
            SetisisProcessing(false)
          } else if (error.weight) {
            Setfailure(true);
            Setmessage(error.weight[0]);
            SetisisProcessing(false)
          } else if (error.health_status) {
            Setfailure(true);
            Setmessage(error.health_status[0]);
            SetisisProcessing(false)
          }
        });
    });
  };

  const handleEdit = (e) => {
    SetisisProcessing(true)
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("farmname", farmname.value);
    formdata.append("animal_name", animal_name);
    formdata.append("breed", breed.value);
    formdata.append("tagnumber", tag_id);
    formdata.append("sex", select_Sex.value);
    formdata.append("age", parseInt(age));
    formdata.append("weight", weight);
    formdata.append('id', idx.id)
    formdata.append('_method', 'put')
    formdata.append("health_status", health.value);
    let headers = {
      "Content-Type": "application/json",
      'Accept': "application/json",
    };
    let url = "editanimaldetails";
    Api_Connect.get("/sanctum/csrf-cookie").then(() => {
      Api_Connect.post(`/api/${url}`, formdata, {headers} )
        .then((res) => {
          console.log(res)
          if (res.data.success) {
            SetisisProcessing(false)
            Setsuccess(true);
            Setmessage(res.data.success);
            Setcreated_tag(res.data.tagnumber)
            // localStorage.setItem('tagnumber', JSON.stringify(res.data.tagnumber))
          }else if(res.data.error){
            SetisisProcessing(false)
            Setfailure(true);
            Setmessage(res.data.error);
          }
        })
        .catch((err) => {
          let error = err.response.data.errors;
          if (error.farmname) {
            SetisisProcessing(false)
            Setfailure(true);
            Setmessage(error.farmname[0]);
          } else if (error.animal_name) {
            SetisisProcessing(false)
            Setfailure(true);
            Setmessage(error.animal_name[0]);
          } else if (error.breed) {
            SetisisProcessing(false)
            Setfailure(true);
            Setmessage(error.breed[0]);
          } else if (error.tagnumber) {
            SetisisProcessing(false)
            Setfailure(true);
            Setmessage(error.tagnumber[0]);
          } else if (error.sex) {
            SetisisProcessing(false)
            Setfailure(true);
            Setmessage(error.sex[0]);
          } else if (error.age) {
            SetisisProcessing(false)
            Setfailure(true);
            Setmessage(error.age[0]);
          } else if (error.weight) {
            SetisisProcessing(false)
            Setfailure(true);
            Setmessage(error.weight[0]);
          } else if (error.health_status) {
            SetisisProcessing(false)
            Setfailure(true);
            Setmessage(error.health_status[0]);
          }
        });
    });

  };

  const handleBack = (e)=>{
  e.preventDefault();
  SetaddAnimal(false)
  window.localStorage.removeItem('tagnumber')
  }

  return (
    <div>
      <div>
        <section className="bg-white px-4 border-2 mt-4 rounded">
          <div className="w-full flex flex-col sm:flex sm:flex-col md:flex md:flex-row  lg:flex lg:flex-row px-3 py-4">
            <div className="w-full">
              <section className="mt-4 w-11/12 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md ">
                <span className="w-full text-left px-3 capitalize text-xs text-gray-600 pt-1">
                  Animal Name
                </span>
                <input
                  type="text"
                  value={animal_name}
                  onChange={(e) => Setanimal_name(e.target.value)}
                  className="w-full px-3  border-none outline-none placeholder-custom placeholder:text-sm"
                  placeholder="Enter Animal Id"
                />
              </section>

              <section className="mt-4 w-11/12 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md ">
                <span className="w-full text-left px-3 capitalize text-xs text-gray-600 pt-1">
                  Breed
                </span>
                <Select
                  className="w-[100%] outline-none border-none placeholder-custom placeholder:text-base"
                  value={breed}
                  onChange={(e)=>Setbreed(e)}
                  options={breedList}
                  styles={customStyles}
                  placeholder="Select Breed here"
                />
              </section>
              <section className="mt-4 w-11/12 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md ">
                <span className="w-full text-left px-3 capitalize text-xs text-gray-600 pt-1">
                  Weight
                </span>
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => SetWeight(e.target.value)}
                  className="w-full px-3  border-none outline-none placeholder-custom placeholder:text-sm"
                  placeholder="Enter Weight here"
                />
              </section>

              {/* <section className='mt-4 w-11/12 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md '>
              <span className='w-full text-left px-3 capitalize text-xs text-gray-600 pt-1'>status</span>
            
              <Select
                className='w-[100%] outline-none border-none'
                onChange={Setselect_Sex}
                options={option_status}
                styles={customStyles}
                placeholder="Select Status here "
                
              />
            </section> */}

              <section className="mt-4 w-11/12 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md">
                <span className="w-full text-left px-3 capitalize text-xs text-gray-600 pt-1">
                  Sex
                </span>
                <Select
                  className="w-[100%] outline-none border-none placeholder-custom placeholder:text-base"
                  value={select_Sex}
                  onChange={(e) => Setselect_Sex(e)}
                  options={option_sex}
                  styles={customStyles}
                  placeholder="Select Sex here"
                />
              </section>
            </div>

            <div className="w-full">
              <section className="mt-4 w-11/12 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md ">
                <span className="w-full text-left px-3 capitalize text-xs text-gray-600 pt-1">
                  Tag ID
                </span>
                <input
                  type="text"
                  value={tag_id}
                  onChange={(e) => Settag_id(e.target.value)}
                  className="w-full px-3  border-none outline-none placeholder-custom placeholder:text-sm"
                  placeholder="Enter Tag Number here"
                />
              </section>

              <section className="mt-4 w-11/12 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md ">
                <span className="w-full text-left px-3 capitalize text-xs text-gray-600 pt-1">
                  Age
                </span>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => Setage(e.target.value)}
                  className="w-full px-3  border-none outline-none placeholder-custom placeholder:text-sm"
                  placeholder="Enter Age"
                />
              </section>

              <section className="mt-4 w-11/12 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md ">
                <span className="w-full text-left px-3 capitalize text-xs text-gray-600 pt-1">
                  Health status
                </span>
                <Select
                  className="w-[100%] outline-none border-none"
                  value={health}
                  onChange={(e) => Sethealth(e)}
                  options={health_status}
                  styles={customStyles}
                  placeholder="Select Health "
                />
              </section>

              <section className="mt-4 w-11/12 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md ">
                <span className="w-full text-left px-3 capitalize text-xs text-gray-600 pt-1">
                  Farm Name
                </span>
                <Select
                  className="w-[100%] outline-none border-none"
                  value={farmname}
                  onChange={(e) => Setfarmname(e)}
                  options={farmList}
                  styles={customStyles}
                  placeholder="Select Farm Name"
                />
              </section>

              {/* <section className='mt-4 w-11/12 flex flex-col items-center border-2 border-[#CFD3D4] rounded-md '>
              <span className='w-full text-left px-3 capitalize text-xs text-gray-600 pt-1'>Percentage</span>
              <Select
                className='w-[100%] outline-none border-none'
                onChange={Setpercentage}
                options={option_status}
                styles={customStyles}
                placeholder="Select Percentage here "
                
              />
            </section> */}
           
              <section className="my-4 w-11/12  items-center border-[#CFD3D4] rounded-md ">
             


              {isEdit?
              <div className="w-full flex flex-col gap-6  sm:w-full sm:flex sm:flex-col sm:gap-6   md:w-full md:flex md:flex-row md:gap-6 lg:w-full  lg:flex lg:flex-row lg:gap-6">

                 <button
               onClick={(e)=>handleBack(e)}
               className="w-full py-2 bg-yellow-400 text-white rounded-md flex justify-center items-center space-x-1 border-none" >
               <h3 className="capitalize text-s">Back to Animal View</h3>
               <FaArrowLeft className="text-sm" />
             </button>
              
               <button
               onClick={(e)=>handleEdit(e)}
               className="w-full py-2 bg-[#4066C2] text-white rounded-md flex justify-center items-center space-x-1 border-none" >
               <h3 className="capitalize text-s">Edit and Continue</h3>
               <FaArrowRight className="text-sm" />
             </button>
             </div>
              :
               <button
               onClick={(e)=>handleClick(e)}
               className="w-full py-2 bg-[#4066C2] text-white rounded-md flex justify-center items-center space-x-1 border-none" >
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
