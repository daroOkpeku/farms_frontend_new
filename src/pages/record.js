import React from 'react'
import { Inter } from "next/font/google";
import {useContext,useState, useEffect} from "react"
import { context } from "../component/context";
import Header from "../component/Header";
import Siderbar from "../component/Siderbar";
import Container_record from '../component/Container_record';
import AddRecord from '../component/AddRecord'
const inter = Inter({ subsets: ["latin"] });
import Successful from "../component/More/Success";
import Fail from "../component/More/Fail";
import Pop_pdf from '../component/More/Pop_pdf';
import Processing from '../component/More/Processing';
import Loader from '../component/More/Loader';
export default function Record() {

  const created = useContext(context)
  const {Success, Setsuccess, Failure, Setfailure, Api_Connect, Setmessage, message, SetisHeading, isHeading, addAnimal, SetaddAnimal, PDFlink, ispdf, Setispdf, isProcessing, Setloadpop} = created




    const [sidebarShow, setSidebarShow] = useState(false);
    const [addRecord, SetaddRecord] = useState(false)
    const [pdfList, SetpdfList] = useState([])
    const [last_page, Setlast_page] = useState(0)
      function visibility() {
        setSidebarShow(!sidebarShow);
      }
      

      useEffect(()=>{
        let headers = {
          "Content-Type": "application/json",
          "Accept": "application/json",
        };
        let urlz = "documentlist";
        Api_Connect.get("/sanctum/csrf-cookie").then(() => {
          Api_Connect.get(`/api/${urlz}`, { headers })
            .then((res) => {
              console.log(res.data.success)
              if (res.data.success) {
                // Setloadpop(false)
                SetpdfList(res.data.success.data)
                Setlast_page(res.data.success.last_pag)
                const timer = setTimeout(()=>{
                  Setloadpop(false)
                 },3500)
              }
            })
          })
      
         
      },[Api_Connect, Setloadpop])


      
  const handlePaginate =(ans)=>{
    let Answer = ans.selected + 1;
        let headers = {
            'Content-Type': 'application/json',
             'Accept': 'application/json',
        };
        let url = 'documentlist?page='+Answer;
        Api_Connect.get('/sanctum/csrf-cookie').then(() => {
            Api_Connect.get(`/api/${url}`, { headers })
                .then(res => {
                  if(res.data.success){
                    
                    SetpdfList(res.data.success.data)
                Setlast_page(res.data.success.last_pag)
    
    
                  }
                    
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }).catch(error => {
            console.error('Error fetching CSRF cookie:', error);
        });
    

}
    

      
    return (
        <div className="w-full flex flex-col items-center h-screen">
        <Header showing={visibility} isSidebarShowing = {sidebarShow}/>
        <section className="w-full flex flex-row items-center">
         <Siderbar show={sidebarShow}  />
         <section className="lg:w-[80%] w-full flex justify-center bg-[#ECEEF6]">
             {addRecord?
               <AddRecord SetaddRecord={SetaddRecord}/>
             :
             pdfList.length > 0?
             <Container_record SetaddRecord={SetaddRecord}  pdfList={pdfList}  last_page={last_page} handlePaginate={handlePaginate} />
             :""
             }
             
         </section>
        </section>
        <Pop_pdf PDFlink={PDFlink}  ispdf={ispdf}  Setispdf={Setispdf} />
        {/* <Pop_pdf/> */}
        <Processing  isProcessing={isProcessing} />
        <Fail Failure={Failure} Setfailure={Setfailure}/>
        <Successful Success={Success} Setsuccess={Setsuccess} message={message} />
        <Loader/>
      </div>
    )
}
