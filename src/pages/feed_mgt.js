import Image from "next/image";
import { Inter } from "next/font/google";
import {useContext , useState, useEffect} from "react"
import { context } from "./component/context";
import Header from "./component/Header";
import Siderbar from "./component/Siderbar";
import Container_group from "./component/Container_group";
import Successful from "./component/More/Success";
import Fail from "./component/More/Failure";
import Processing from './component/More/Processing';
const inter = Inter({ subsets: ["latin"] });

export default function Feed_Mgt() {
  const created = useContext(context)
  const {Success, Setsuccess, Failure, Setfailure, Api_Connect, SetisisProcessing, isProcessing} = created
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
    };
    //?page='+Answer
    let url = "feed_mgt?page="+1;
    Api_Connect.get("/sanctum/csrf-cookie").then(() => {
      Api_Connect.get(`/api/${url}`, { headers }).then((res) => {
        if(res.data.success){
          // console.log(res.data.success.data)
          SetData(res.data.success.data)
          Setlast_page(res.data.success.last_page)
        }

      })

    })

  },[Api_Connect])



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
   </div>
    )
}
