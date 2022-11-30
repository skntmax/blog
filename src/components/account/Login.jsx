
import React from 'react'
import {Box,Button,TextField,styled,Typography} from '@mui/material' 
import { API } from '../../services/api.js'
import { useState,useContext} from 'react'
import SampleComponent from './../../redux_store/SampleComponent';

import { DataContext } from '../../context/DataProvider.jsx'

 const Component = styled(Box)`
  width:400px;
  margin:auto;
  box-shadow:5px 2px 5px 2px rgb(0 0 0/ 0.8);
`
const Image = styled('img')({
  width : 350,
  height:70,
  margin:'auto',
  marginTop:'5px',
  display:'flex',
  padding:'50px 0 0' 
})


const Wrapper = styled(Box)`
  padding:25px 35px;
  display:flex;
  flex:1;
  flex-direction:column;
  & > div, & button ,& > p{
    margin-top:15px;
  }
`
const LoginButton = styled(Button)`
  text-transform:none;
  height:48px;
`
const SignUpButton = styled(Button)`
  text-transform:none;
  
  height:48px;
  box-shadow:0 2px 4px 0 rgb( 0 0 0/ 20%);
`
const Error = styled(Typography)`
  font-size:10px;
  color:16px;
  color:#ff6161;
  line-height:0;
  margin-top:10px;
  font-weight:600;
`
const signUpInitialValues = {
  name:'',
  username:'',
  password:''
}

const loginInitialValues = {
  username:'',
  password:''
}



export default function Login() {
const ImageUrl = 'https://www.shutterstock.com/image-vector/welcome-letters-banner-on-blue-600w-1189574716.jpg'
/*
  toggling forms for login and signup!
*/ 
const [account, toggleAccount] = useState('login');
const [signup, setSignup] = useState(signUpInitialValues)
const [login, setLogin] = useState(loginInitialValues)
const [error,setError]=useState('');
const {setAccount} = useContext(DataContext);
const toggleSignup= ()=>{
  account==='signup'?toggleAccount('login'):toggleAccount('signup');
}

const onInputChange = (events)=>{
  setSignup({...signup,[events.target.name]:events.target.value})

}


const signupUser =   async ()=>{
    let response = await API.userSignup(signup);
    console.log(response)
    if(response.isSuccess){
      setError('')
      setSignup(signUpInitialValues)
      toggleAccount('login')
    }else{
      setError('something went wrong :( ')
    }
}


const onLoginInputChange = (events)=>{
  setLogin({...login,[events.target.name]:events.target.value})
}

 
const loginUser = async () => {
  let response = await API.userLogin(login);
  console.log(response)
  if(response.isSuccess){
    setError('')
    sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`)
    sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshToken}`)
    setAccount({username:response.data,name:response.data.name})
     
  }else{
    setError("Please try again, may be something is wrong");
    }
 }

  return (
    <Component>
        <Box>
          <Image src = {ImageUrl} alt="LoginImage" />
          {
            account === 'login' ?
          <Wrapper>
            <TextField variant='standard' value = {login.username}  onChange={(events)=>onLoginInputChange(events)} name='username' label="Enter username"/>
            <TextField variant='standard' value = {login.password}  onChange={(events)=>onLoginInputChange(events)} name='password' label="Enter password"/>
            {error && <Error>{error}</Error>}
            <LoginButton onClick={()=>loginUser()} variant='contained'>Login!</LoginButton>
            <Typography style={{textAlign:'center'}}>Not A User?</Typography>
            <SignUpButton onClick={()=>toggleSignup()}>Create new Account!</SignUpButton>
          </Wrapper> 
          :
          <Wrapper>
            <TextField variant='standard' name="name" label="Enter Name" onChange={(events)=>onInputChange(events)}/>
            <TextField variant='standard' name="username" label="Enter username" onChange={(events)=>onInputChange(events)}/>
            <TextField variant='standard' name="password" label="Enter password" onChange={(events)=>onInputChange(events)}/>
            {error && <Error>{error}</Error>}
            <SignUpButton onClick={()=>signupUser()}>SignUp!</SignUpButton>
            <Typography style={{textAlign:'center'}}>OR</Typography>
            <LoginButton variant='contained' onClick={()=>toggleSignup()}>Already an user?</LoginButton>
          </Wrapper>
        }
      </Box>
      <SampleComponent />
       
    </Component>
  )
}
