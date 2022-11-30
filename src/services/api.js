import axios from 'axios'
import { Api_errors, SERVICE_URLS} from '../self_defined_errors/error_message.js'
const API_URL = 'http://localhost:8000'
const axiosInstance = axios.create({
    baseURL:API_URL,
    timeout:10000,
    headers:{
        'content-type':"Application/json"
    }

})

axiosInstance.interceptors.request.use(
    function(config){
        return config;
    },
    function(err){
       return  Promise.reject(err)
    }
)

axiosInstance.interceptors.response.use(
    function(response){
        //stop globl loader
        return processResponse(response);
    },
    function(err){
        // so global loader
        return Promise.reject(processError(err));
    }
)

// if success -> return {issuccess = true,data:object}
// error return{isfailure= true, status:string,msg:string, code: int}
const processResponse = (response)=>{
    if(response?.status === 200){
        return {isSuccess:true, data:response.data}
    }else{
        return {isFailure:true,status:response?.status, msg:response?.msg,code:response.code}
    }
}


// if success -> return {issuccess = true,data:object}
// error return{isfailure= true, status:string,msg:string, code: int}

const processError = (err) =>{
    if(err.response){
        console.log("Error in response: ", err.toJSON());
        return{
            isError:true,
            msg:Api_errors.responseFailure,
            code:err.response.status
        }
    }else if(err.request){
        console.log("Error in request: ", err.toJSON());
        return{
            isError:true,
            msg: Api_errors.requestFailure,
            code:""
        }

    }else{
        console.log("Network error: ", err.toJSON());
        return{
            isError:true,
            msg:Api_errors.networkError,
            code:""
        }
    }
}

const API = {}

for(const[key,value] of Object.entries(SERVICE_URLS)){
    API[key]=(body , showUploadProgress, showDownloadProgress ) =>
        axiosInstance({
            method:value.method,
            url:value.url,
            data:body,
            responseType:value.responseType,
            onUploadProgress:function(progressEvent){
                if(showUploadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded*100)/progressEvent.total)
                    showUploadProgress(percentageCompleted)
                }
            },
            onDownloadProgress:function(progressEvent){
                if(showDownloadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded*100)/progressEvent.total)
                    showDownloadProgress(percentageCompleted)
                }
            }
        })
}
export {API};