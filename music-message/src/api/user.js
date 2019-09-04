import request from "../utils/request"
let api = {
    user:{
        login : data => request.post("/api/login",data),
        registry:data => request.post("/api/registry",data)

    },
    
}
export default api

