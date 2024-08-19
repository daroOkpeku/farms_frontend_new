import Container_finance from './component/Container_finance';
import { Inter } from "next/font/google";
import {useContext , useState, useEffect} from "react"
import { context } from "./component/context";
import Header from "./component/Header";
import Siderbar from "./component/Siderbar";
import Successful from "./component/More/Success";
import Fail from "./component/More/Failure";
import Processing from './component/More/Processing';
const inter = Inter({ subsets: ["latin"] });


export default function Finance() {

  const [sidebarShow, setSidebarShow] = useState(false);
  const created = useContext(context)
  const {Success, Setsuccess, Failure, Setfailure, isProcessing} = created
// finance_list url
  function visibility() {
    setSidebarShow(!sidebarShow);
  }



  


  return (
    <div className="w-full flex flex-col items-center h-screen fixed">
    <Header showing={visibility} isSidebarShowing = {sidebarShow}/>
    <section className="w-full flex flex-row items-center">
     <Siderbar show={sidebarShow}/>
     <section className="lg:w-[80%] w-full flex justify-center bg-[#ECEEF6]">
       <Container_finance />
     </section>
    </section>
    <Processing  isProcessing={isProcessing}/>
    <Fail Failure={Failure} Setfailure={Setfailure}/>
     <Successful Success={Success} Setsuccess={Setsuccess} />
  </div>
    
  )
}
