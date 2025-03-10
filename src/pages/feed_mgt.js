import Image from "next/image";
import { Inter } from "next/font/google";
import {useContext , useState, useEffect} from "react"
import { context } from "../component/context";
import Header from "../component/Header";
import Siderbar from "../component/Siderbar";
// import Container_group from "./component/Container_group";
import Container_group from "../component/Container_group";
import Successful from "../component/More/Success";
import Fail from "../component/More/Fail";
import Processing from '../component/More/Processing';
import Loader from "../component/More/Loader";
const inter = Inter({ subsets: ["latin"] });

export default function Feed_Mgt() {
  const created = useContext(context)
  const {Success, Setsuccess, Failure, Setfailure, Api_Connect, SetisisProcessing, isProcessing, Setloadpop} = created
const [sidebarShow, setSidebarShow] = useState(false);
const [Data, SetData] = useState([])
const [last_page, Setlast_page] = useState(0)
  function visibility() {
    setSidebarShow(!sidebarShow);
  }

  useEffect(()=>{
    let headers = {
      "Content-Type": "application/json",
      'Accept': "application/json",
      'X-API-KEY':  process.env.NEXT_PUBLIC_CODE
    };
    //?page='+Answer
    let url = "feed_mgt?page="+1;
    Api_Connect.get("/sanctum/csrf-cookie").then(() => {
      Api_Connect.get(`/api/${url}`, { headers }).then((res) => {
        if(res.data.success){
          // console.log(res.data.success.data)
          // Setloadpop(false)
          SetData(res.data.success.data)
          Setlast_page(res.data.success.last_page)
              // Setloadpop(true)
          const timer = setTimeout(()=>{
            Setloadpop(false)
          },3500)
        }

      })

    })

    //  return () => clearTimeout(timer);

  },[Api_Connect, Setloadpop])



    return (
   <div className="w-full flex flex-col items-center h-screen fixed">
     <Header showing={visibility} isSidebarShowing = {sidebarShow}/>
     <section className="w-full flex flex-row items-center">
      <Siderbar show={sidebarShow}/>
      <section className="lg:w-[80%] w-full flex justify-center bg-[#ECEEF6]">
        <Container_group Data={Data}  last_page={last_page} SetData={SetData}  Setlast_page={Setlast_page} SetisisProcessing={SetisisProcessing} />
      </section>
     </section>
     <Processing  isProcessing={isProcessing}/>
     <Fail Failure={Failure} Setfailure={Setfailure}/>
     <Successful Success={Success} Setsuccess={Setsuccess} />
     <Loader/>
   </div>
    )
}
