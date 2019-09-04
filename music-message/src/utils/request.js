import axios from "axios"
var instance  = axios.create();
//全局拦截

//添加请求拦截
instance.interceptors.request.use(function(config){
   let notTokenUrl = ["/api/login","api/registry"];

    return notTokenUrl.includes(config.url) ? config :{
      ...config,
      headers:{
          ...config.headers,
          token:localStorage.getItem("token")
      }
    } 
}),function(error) {
    //对请求错误做些什么
     return Promise.reject(error)
}
//添加响应拦截
instance.interceptors.request.use(function (response){
  
    //对响应数据做点什么
    return response
     //对响应错误做点什么
}),function(error)
{
    let {status} = error.response;
    console.log(status)
    if(status>=500)
    {
        console.log("服务器错误")
    }else{
       switch(status)
       {
           case 422:console.log("参数错误");break;
           case 401:console.log("没有权限");break;
           default:break;
             

       }
    }
    return Promise.reject(error)
}

export default {
    post(url,data)
    {
       return instance.post(url,data)
    },
    get(url,data)
    {
        return instance.get(url,{params:data})
    }
}
