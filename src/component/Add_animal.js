import React,{useState, useContext, useEffect} from 'react'
import  Animalrecords  from './More/Animalrecords'
import  Photo  from './More/Photo'
import  Financialrecord from './More/Financialrecord'
import  Feed  from './More/Feed'
import  Health  from './More/Health'
import  Productiondata  from './More/Productiondata'
import { context } from './context';
import SuccessPop from './More/Success';
import Fail from './More/Fail'
import { name } from 'file-loader';
export default function Add_animal  ({addAnimal, SetaddAnimal, SetisHeading, isHeading, editId, Cliconanimal}) {

const created = useContext(context)
const {Success, Setsuccess, Failure, Setfailure, Api_Connect, Setmessage, message, Setcreated_tag, created_tag, SetisisProcessing } = created

const headingTop = [
    "Animal Records",
    "Photo",
    "Feed Management",
    "Health & Veterinary",
    "Production Data",
    "Financial Record"
]

const existchange = [
    {
        name:'Animal Records',
        components:<Animalrecords  Api_Connect={Api_Connect} Setsuccess={Setsuccess} Success={Success} Setfailure={Setfailure} Failure={Failure} Setmessage={Setmessage} message={message} Setcreated_tag={Setcreated_tag} created_tag={created_tag} editId={editId} SetaddAnimal={SetaddAnimal} SetisisProcessing={SetisisProcessing}/>
    },
    {
        name:'Photo',
        components:<Photo  Api_Connect={Api_Connect} created_tag={created_tag} Setsuccess={Setsuccess} Success={Success} Setfailure={Setfailure} Failure={Failure} SetisisProcessing={SetisisProcessing} />
    },
    {
        name:'Feed Management',
        components:<Feed Api_Connect={Api_Connect} created_tag={created_tag} Setsuccess={Setsuccess} Success={Success} Setfailure={Setfailure} Failure={Failure} Setcreated_tag={Setcreated_tag} Setmessage={Setmessage} SetisisProcessing={SetisisProcessing} />
    },
    {
        name:'Health & Veterinary',
        components:<Health  Api_Connect={Api_Connect} created_tag={created_tag} Setsuccess={Setsuccess} Success={Success} Setfailure={Setfailure} Failure={Failure} Setcreated_tag={Setcreated_tag} Setmessage={Setmessage} SetisisProcessing={SetisisProcessing} />
    },
    {
        name:'Production Data',
        components:<Productiondata   Api_Connect={Api_Connect} created_tag={created_tag} Setsuccess={Setsuccess} Success={Success} Setfailure={Setfailure} Failure={Failure} Setcreated_tag={Setcreated_tag} Setmessage={Setmessage} SetisisProcessing={SetisisProcessing} />
    },
    {
        name:'Financial Record',
        components:<Financialrecord Api_Connect={Api_Connect} created_tag={created_tag} Setsuccess={Setsuccess} Success={Success} Setfailure={Setfailure} Failure={Failure} Setcreated_tag={Setcreated_tag} Setmessage={Setmessage} SetisisProcessing={SetisisProcessing} />
    }
]

const [tagx, Settagx] = useState(null)


useEffect(()=>{
    var tagxl = window.localStorage.getItem('tagnumber')?JSON.parse(window.localStorage.getItem('tagnumber')):editId
    if(tagxl && Object.keys(tagxl).length > 0){
    Setcreated_tag(tagxl.tagnumber) 
    }

    Settagx(tagx)
 
},[Setcreated_tag, tagx, Setfailure,Setmessage, editId])


const changeComp = ()=>{
    var checktag = window.localStorage.getItem('tagnumber')?JSON.parse(window.localStorage.getItem('tagnumber')):window.localStorage.getItem('tagnumber')

     if(checktag && Object.keys(checktag).length > 0 ){
    // let ansexistchange =   existchange.filter((item)=>item.name == isHeading)
    // console.log(ansexistchange)
    // return ansexistchange[0].components

    switch (isHeading) {
        case 'Animal Records':
            return(<Animalrecords  Api_Connect={Api_Connect} Setsuccess={Setsuccess} Success={Success} Setfailure={Setfailure} Failure={Failure} Setmessage={Setmessage} message={message} Setcreated_tag={Setcreated_tag} created_tag={created_tag} editId={editId} SetaddAnimal={SetaddAnimal} SetisisProcessing={SetisisProcessing}/>)
     case 'Photo':
     return(<Photo  Api_Connect={Api_Connect} created_tag={created_tag} Setsuccess={Setsuccess} Success={Success} Setfailure={Setfailure} Failure={Failure} SetisisProcessing={SetisisProcessing} />)
    case 'Feed Management':
    return(<Feed Api_Connect={Api_Connect} created_tag={created_tag} Setsuccess={Setsuccess} Success={Success} Setfailure={Setfailure} Failure={Failure} Setcreated_tag={Setcreated_tag} Setmessage={Setmessage} SetisisProcessing={SetisisProcessing} />)
      case 'Health & Veterinary':
        return(<Health  Api_Connect={Api_Connect} created_tag={created_tag} Setsuccess={Setsuccess} Success={Success} Setfailure={Setfailure} Failure={Failure} Setcreated_tag={Setcreated_tag} Setmessage={Setmessage} SetisisProcessing={SetisisProcessing} />)
case 'Production Data':
            return(<Productiondata   Api_Connect={Api_Connect} created_tag={created_tag} Setsuccess={Setsuccess} Success={Success} Setfailure={Setfailure} Failure={Failure} Setcreated_tag={Setcreated_tag} Setmessage={Setmessage} SetisisProcessing={SetisisProcessing} />)
   case 'Financial Record':
    return(<Financialrecord Api_Connect={Api_Connect} created_tag={created_tag} Setsuccess={Setsuccess} Success={Success} Setfailure={Setfailure} Failure={Failure} Setcreated_tag={Setcreated_tag} Setmessage={Setmessage} SetisisProcessing={SetisisProcessing} />)
 
        default:
            return(<Animalrecords  Api_Connect={Api_Connect} Setsuccess={Setsuccess} Success={Success} Setfailure={Setfailure} Failure={Failure} Setmessage={Setmessage} message={message} Setcreated_tag={Setcreated_tag} created_tag={created_tag} editId={editId} SetaddAnimal={SetaddAnimal} SetisisProcessing={SetisisProcessing} SetClickonanilmal={SetClickonanilmal}/>)
         
    }
    }else{
      
        return(<Animalrecords  Api_Connect={Api_Connect} Setsuccess={Setsuccess} Success={Success} Setfailure={Setfailure} Failure={Failure} Setmessage={Setmessage} message={message} Setcreated_tag={Setcreated_tag} created_tag={created_tag} editId={editId} SetaddAnimal={SetaddAnimal} SetisisProcessing={SetisisProcessing}  SetClickonanilmal={SetClickonanilmal}/>

        )

}
}
// /
const handleClear =(text)=>{
   var checktag = window.localStorage.getItem('tagnumber')?JSON.parse(window.localStorage.getItem('tagnumber')):window.localStorage.getItem('tagnumber')
   if(checktag && Object.keys(checktag).length > 0 && checktag.editx == '' && checktag.tagnumber != ""){
      let object = {'tagnumber':tagx.tagnumber, 'id':tagx.id, 'editx':tagx.editx}
    window.localStorage.setItem('tagnumber', JSON.stringify(object))
    SetisHeading(text)
   }else if(checktag && Object.keys(checktag).length > 0 && checktag.editx !== '' && checktag.tagnumber !== ""){
    SetisHeading(text)
   }else{
           Setfailure(true)
        Setmessage('please create or edit an animal')
        SetisHeading('Animal Records')
   }
    // if(tagx && Object.keys(tagx).length > 0 && tagx.editx == '' && tagx.tagnumber != ""){
    // let object = {'tagnumber':tagx.tagnumber, 'id':tagx.id, 'editx':tagx.editx}
    // window.localStorage.setItem('tagnumber', JSON.stringify(object))
    // SetisHeading(text)
    // }else if(tagx && Object.keys(tagx).length > 0 && tagx.editx !== '' && tagx.tagnumber !== ""){
    //     SetisHeading(text)
    // }
    // else{
    //     Setfailure(true)
    //     Setmessage('please create or edit an animal')
    //     SetisHeading('Animal Records')
    // }
}

    return (
        <div className={addAnimal?"w-full bg-cover h-screen mt-5":"hidden"}>
            <div className='w-[99%] m-auto flex flex-row gap-12 bg-white p-6 border-2 rounded text-slate-800 text-base cursor-pointer overflow-x-scroll scrollbar sm:overflow-x-scroll sm:scrollbar '>
                {headingTop.map((item, index)=>{
                    
                       var checktag = window.localStorage.getItem('tagnumber')?JSON.parse(window.localStorage.getItem('tagnumber')):window.localStorage.getItem('tagnumber')
                       console.log(checktag, Cliconanimal)
                    if(checktag && Object.keys(checktag).length > 0 && checktag.editx == 'isedit' && checktag.tagnumber != "" && Cliconanimal){
                        return <p   className={isHeading == item ?"border-b-4 border-[#4066C2] text-[#4066C2] font-bold text-xs sm:text-sm md:text-sm  lg:text-base":"text-[#333333] text-xs sm:text-sm md:text-sm  lg:text-base"} key={index} onClick={(e)=>handleClear(e.target.innerText)} >{item}</p>
                    }else if(checktag && Object.keys(checktag).length > 0 && checktag.editx == 'isedit' && checktag.tagnumber != "" && !Cliconanimal){
                        return <p  className={isHeading == item ?"border-b-4 border-[#4066C2] text-[#4066C2] font-bold text-xs sm:text-sm md:text-sm  lg:text-base":"text-[#333333] text-xs sm:text-sm md:text-sm  lg:text-base "} key={index} >{item}</p>
                    }
                    else{
                        return <p  className={isHeading == item ?"border-b-4 border-[#4066C2] text-[#4066C2] font-bold text-xs sm:text-sm md:text-sm  lg:text-base":"text-[#333333] text-xs sm:text-sm md:text-sm  lg:text-base "} key={index} onClick={(e)=>handleClear(e.target.innerText)}>{item}</p>

                    }
                }
                    )}
          
            </div>
            <section className='w-[99%] m-auto'>
            {changeComp()}

            </section>
            <SuccessPop  Success={Success}  Setsuccess={Setsuccess}   />
            <Fail  Failure={Failure} Setfailure={Setfailure} />
        </div>
    )
}


