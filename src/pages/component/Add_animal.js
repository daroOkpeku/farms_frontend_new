import React,{useState, useContext, useEffect} from 'react'
import  Animalrecords  from './More/Animalrecords'
import  Photo  from './More/Photo'
import  Financialrecord from './More/Financialrecord'
import  Feed  from './More/Feed'
import  Health  from './More/Health'
import  Productiondata  from './More/Productiondata'
import { context } from './context';
import SuccessPop from './More/Success';
import FailurePop from './More/Failure'
import { name } from 'file-loader';
export const Add_animal = ({addAnimal, SetaddAnimal, SetisHeading, isHeading, editId}) =>{

const created = useContext(context)
const {Success, Setsuccess, Failure, Setfailure, Api_Connect, Setmessage, message, Setcreated_tag, created_tag,SetisisProcessing } = created

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
var tagx = localStorage.getItem('tagnumber')?JSON.parse(localStorage.getItem('tagnumber')):editId

useEffect(()=>{
    if(tagx && Object.keys(tagx).length > 0){
    Setcreated_tag(tagx.tagnumber) 
    }


 
},[Setcreated_tag, tagx, Setfailure,Setmessage])


const changeComp = ()=>{
    if(tagx && Object.keys(tagx).length > 0 ){
    let ansexistchange =   existchange.filter((item)=>item.name == isHeading)
    return ansexistchange[0].components
    }else{
      
        return(<Animalrecords  Api_Connect={Api_Connect} Setsuccess={Setsuccess} Success={Success} Setfailure={Setfailure} Failure={Failure} Setmessage={Setmessage} message={message} Setcreated_tag={Setcreated_tag} created_tag={created_tag} editId={editId} SetaddAnimal={SetaddAnimal} SetisisProcessing={SetisisProcessing}/>

        )

}
}

const handleClear =(text)=>{
    console.log(tagx)
    if(tagx && Object.keys(tagx).length > 0 && tagx.editx == '' && tagx.tagnumber != ""){
    let object = {'tagnumber':tagx.tagnumber, 'id':tagx.id, 'editx':tagx.editx}
    localStorage.setItem('tagnumber', JSON.stringify(object))
    SetisHeading(text)
    }else{
        Setfailure(true)
        Setmessage('please create or edit an animal')
        SetisHeading('Animal Records')
    }
}

    return (
        <div className={addAnimal?"w-full bg-cover h-screen mt-5":"hidden"}>
            <div className='w-[99%] m-auto flex flex-row gap-12 bg-white p-6 border-2 rounded text-slate-800 text-base cursor-pointer overflow-x-scroll scrollbar sm:overflow-x-scroll sm:scrollbar '>
                {headingTop.map((item, index)=>{
                    if(tagx && Object.keys(tagx).length > 0 && tagx.editx == 'isedit' && tagx.tagnumber != "" ){
                        return <p   className={isHeading == item ?"border-b-4 border-[#4066C2] text-[#4066C2] font-bold text-xs sm:text-sm md:text-sm  lg:text-base":"text-[#333333] text-xs sm:text-sm md:text-sm  lg:text-base"} key={index} >{item}</p>
                    }else if(tagx && Object.keys(tagx).length > 0 && tagx.editx == '' && tagx.tagnumber != "" ){
                        return <p  className={isHeading == item ?"border-b-4 border-[#4066C2] text-[#4066C2] font-bold text-xs sm:text-sm md:text-sm  lg:text-base":"text-[#333333] text-xs sm:text-sm md:text-sm  lg:text-base "} key={index} onClick={(e)=>handleClear(e.target.innerText)}>{item}</p>
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
            <FailurePop  Failure={Failure} Setfailure={Setfailure} />
        </div>
    )
}


