import Image from "next/image";
import { Inter } from "next/font/google";
import {useContext , useState} from "react"
import { context } from "./component/context";
import Header from "./component/Header";
import Siderbar from "./component/Siderbar";
import Inside from "./component/Inside";
import Successful from "./component/More/Success";
import Fail from "./component/More/Fail";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
const created = useContext(context)
const {Success, Setsuccess, Failure, Setfailure, Api_Connect} = created
const [sidebarShow, setSidebarShow] = useState(false);

  function visibility() {
    setSidebarShow(!sidebarShow);
  }

  return (
   <div className="w-full flex flex-col items-center h-screen fixed overflow-x-scroll scrollbar">
     <Header showing={visibility} isSidebarShowing = {sidebarShow}/>
     <section className="w-full flex flex-row items-center">
      <Siderbar show={sidebarShow}/>
      <section className="lg:w-[80%] w-full flex justify-center bg-[#ECEEF6] ">
      <Inside/>
      </section>
     </section>
     <Fail Failure={Failure} Setfailure={Setfailure}/>
     <Successful Success={Success} Setsuccess={Setsuccess} />
   </div>
  );
}
