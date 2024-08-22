import React from 'react'
import Header from "../component/Header";
import Siderbar from "../component/Siderbar";
import Successful from "../component/More/Success";
import Fail from "../component/More/Fail";
import Animal_health_Container from '../component/More/Animal_health_Container';
import {useContext,useState, useEffect} from "react"
import { context } from "../component/context";
import Loader from "../component/More/Loader"
export default function Animal_Health() {
    const created = useContext(context)
    const {Success, Setsuccess, Failure, Setfailure, Api_Connect, Setmessage, message, SetisHeading, isHeading, addAnimal, SetaddAnimal} = created
const [sidebarShow, setSidebarShow] = useState(false);

const [editId, SetEditId] = useState(null)
  function visibility() {
    setSidebarShow(!sidebarShow);
  }
    return (
        <div className="w-full flex flex-col items-center h-screen">
            <Header showing={visibility} isSidebarShowing = {sidebarShow}/>
            <section className="w-full flex flex-row items-center">
            <Siderbar show={sidebarShow}/>
            <section className="lg:w-[80%] w-full flex justify-center bg-[#ECEEF6]">
               {/* inside body */}
             <Animal_health_Container/>
         </section>
            </section>
            <Fail Failure={Failure} Setfailure={Setfailure}/>
        <Successful Success={Success} Setsuccess={Setsuccess} message={message} />
         <Loader/>
            
        </div>
    )
}
