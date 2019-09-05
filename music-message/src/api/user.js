import request from "../utils/request"
let api = {
    user:{
        login : data => request.post("/api/login",data),
        registry:data => request.post("/api/registry",data),
        getinfo:() => request.get("/api/userinfo")
    },
    
}
export default api

