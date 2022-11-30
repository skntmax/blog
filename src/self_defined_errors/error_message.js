// Errors messages related to Apis.

export const Api_errors = {
    loading:{
        title:"loading...",
        message:"Data is being loaded, stay for a while"
    },
    success:{
        title:"Success",
        message:"Data succesfully loaded"
    },
    responseFailure:{
        title:"error occured",
        message:"Error in getting reponse from server, please try again"
    },
    requestFailure:{
        title:"Error",
        message:"Error while parsing the request data"
    },
    networkError:{
        title:'Error',
        message:"Can not connect to server, may be internet problem"
    }
}
//API SERVICE CALLING
export const SERVICE_URLS = {
    userSignup:{url:'/signup', method:'POST'},
    userLogin: {url:'/login',  method:'POST'}
}