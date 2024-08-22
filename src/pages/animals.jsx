import React from 'react'
import { Inter } from "next/font/google";
import {useContext,useState, useEffect} from "react"
import { context } from "../component/context";
import Header from "../component/Header";
import Siderbar from "../component/Siderbar";
import Container from '../component/Container';
import Add_animal from '../component/Add_animal';
import { useRouter } from 'next/router';
const inter = Inter({ subsets: ["latin"] });
import Successful from "../component/More/Success";
import Fail from "../component/More/Fail";
import Processing from '../component/More/Processing';
import Loader from '../component/More/Loader';
export default function Animals() {
    const created = useContext(context)
    const {Success, Setsuccess, Failure, Setfailure, Api_Connect, Setmessage, message, SetisHeading, isHeading, addAnimal, SetaddAnimal, SetisisProcessing, isProcessing, Setloadpop, Loadpop} = created
const [sidebarShow, setSidebarShow] = useState(false);
// const [addAnimal, SetaddAnimal] = useState(false)
// const [isHeading, SetisHeading] = useState("Animal Records")
const [editId, SetEditId] = useState(null)
  function visibility() {
    setSidebarShow(!sidebarShow);
  }
  // const router = useRouter();
  // const { tag_id, section } = router.query;
  // console.log(tag_id, section)
  // useEffect(()=>{
  //   SetisHeading(section)
  //   SetEditId(tag_id)
  // },[isHeading, section, tag_id])


    return (
        <div className="w-full flex flex-col items-center h-screen">
        <Header showing={visibility} isSidebarShowing = {sidebarShow}/>
        <section className="w-full flex flex-row items-center">
         <Siderbar show={sidebarShow}/>
         <section className="w-full lg:w-[80%]  flex justify-center bg-[#ECEEF6]">
          { addAnimal ?
          
           <Add_animal addAnimal={addAnimal} SetaddAnimal={SetaddAnimal}  SetisHeading={SetisHeading}  isHeading={isHeading} editId={editId} /> 
          :
          <Container Setsuccess={Setsuccess} SetaddAnimal={SetaddAnimal}  Api_Connect={Api_Connect} Setmessage={Setmessage} SetEditId={SetEditId} Setfailure={Setfailure} SetisHeading={SetisHeading} SetisisProcessing={SetisisProcessing}  Setloadpop={Setloadpop} Loadpop={Loadpop} />
          }
             
             
         </section>
        </section>
        <Processing  isProcessing={isProcessing}/>
        <Fail Failure={Failure} Setfailure={Setfailure}/>
        <Successful Success={Success} Setsuccess={Setsuccess} message={message} />
        <Loader/>
      </div>
    )
}
