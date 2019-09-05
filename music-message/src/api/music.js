import request from "../utils/request"
let api = {
      querymusic:data =>request.get("/api/querymusic",data),
      deletemusic:id =>request.get("/api/deletemusic",id),
      upload:data => request.post("/api/upload",data),
      addmusic:data => request.post("/api/addmusic",data),
      Modify:data => request.post("/api/updatemusic",data)
}
export default api

