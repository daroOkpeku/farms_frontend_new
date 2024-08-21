import React, {createContext, useState, useEffect} from "react";
import axios from 'axios'
const context =  createContext();

export default function Provider({children}){
    const [Success, Setsuccess] = useState(false)
    const [Failure, Setfailure] = useState(false)
    const [message, Setmessage] = useState('')
    const [created_tag, Setcreated_tag] = useState('')
    const [isHeading, SetisHeading] = useState("Animal Records")
    const [addAnimal, SetaddAnimal] = useState(false)
    const [PDFlink, SetPDFlink] = useState("")
    const [ispdf, Setispdf] = useState(false)
    const [isProcessing, SetisisProcessing] = useState(false)
      const Api_Connect = axios.create({
      baseURL:'https://api.ranchidpro.com',
      // 'https://api.ranchidpro.com',
      withCredentials:true
   })
   useEffect(()=>{
    if(Success || Failure){
      setTimeout(()=>{
        Setmessage('')
      },2500)
    }
   },[Failure, Success])
    return(
        <context.Provider 
        value={{ 
            hello:"test",
            Success:Success,
            Setsuccess:Setsuccess,
            Failure:Failure,
            Setfailure:Setfailure,
            Api_Connect:Api_Connect,
            Setmessage:Setmessage,
            message:message,
            Setcreated_tag:Setcreated_tag,
            created_tag:created_tag,
            isHeading:isHeading,
            SetisHeading:SetisHeading,
            addAnimal:addAnimal,
            SetaddAnimal:SetaddAnimal,
            SetPDFlink:SetPDFlink,
            PDFlink:PDFlink,
            Setispdf:Setispdf,
            ispdf:ispdf,
            SetisisProcessing:SetisisProcessing,
            isProcessing:isProcessing
         }}
        >
        {children}
        </context.Provider>
    )
}

export {Provider, context}