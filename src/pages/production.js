import React from 'react';
import Header from "../component/Header";
import Siderbar from "../component/Siderbar";
import Successful from "../component/More/Success";
import Fail from "../component/More/Fail";
import {useContext,useState, useEffect} from "react"
import { context } from "../component/context";
import Production_Containter from '../component/More/Production_Containter';
import Processing from '../component/More/Processing';
import Loader from '../component/More/Loader';
export default function Production() {
    const created = useContext(context)
    const {Success, Setsuccess, Failure, Setfailure, Api_Connect, Setmessage, message, SetisHeading, isHeading, addAnimal, SetaddAnimal, isProcessing,  SetClickonanilmal} = created
    const [sidebarShow, setSidebarShow] = useState(false);

    const [editId, SetEditId] = useState(null)
      function visibility() {
        setSidebarShow(!sidebarShow);
      }
    return (
      <div className="w-full flex flex-col items-center h-screen">
        <Header showing={visibility} isSidebarShowing={sidebarShow} />
        <section className="w-full flex flex-row items-center">
          <Siderbar show={sidebarShow} />
          <section className="lg:w-[80%] w-full flex justify-center bg-[#ECEEF6]">
             <Production_Containter  SetClickonanilmal={SetClickonanilmal} />
          </section>
        </section>
        <Processing  isProcessing={isProcessing} />
        <Fail Failure={Failure} Setfailure={Setfailure}/>
        <Successful Success={Success} Setsuccess={Setsuccess} message={message} />
        <Loader/>
      </div>
    );
}
