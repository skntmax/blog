import { create } from "@mui/material/styles/createTransitions"
import { createStore } from "redux"
import {composeWithDevTools} from 'redux-devtools-extension'
import { combineReducers } from 'redux'

let initialState = {
     username:"amit ",
     password :"1234"
}
 
const userData =(state= initialState , action )=> {
   switch(action.type) {
       case "LOGIN" :
           console.log("you are in login page ");
      return {...state}

      default:
        console.log("this is default login case ");
         return {...state}
        }
      
} 
 
let rootReducer = combineReducers( {
    data:userData
})



export default   createStore(rootReducer , composeWithDevTools() )