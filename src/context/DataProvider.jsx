import { createContext } from "react"
import { useState } from "react"
export const DataContext = createContext()

const DataProvider = ({children})=>{
const [account,setAccount] = useState({username:'',name:''})
    return (
        <DataContext.Provider value = {{
            account,
            setAccount
         }} >
          {children}
         </DataContext.Provider>
     )
  }
   

export default DataProvider;