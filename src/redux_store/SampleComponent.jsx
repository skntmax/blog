import React ,{useState} from 'react'
import { Dispatch } from 'react'
import { useDispatch, useSelector } from 'react-redux'
function SampleComponent() {
       let dispatch = useDispatch()
       let loginData  =useSelector(data=> data.data)
  
     const [ show , setShow ] = useState(false)
  
     return (
    <div className="text-center">
     SampleComponent 
       <button onClick={e=>{
            
           dispatch({
             type:"LOGIN" ,
             payload:{
                data:"nothing"
             }
         })
         setShow(true)
       }}>   {!show?"show me " :"hide"}   </button>
        {show?"data fetched from reducer , \n username:"+loginData.username+", \n \n"+"password:"+loginData.password :""}
     </div>
  )
}

export default SampleComponent