export default{
    state:{
        username:""
    },
    mutations:{
        setUserName(state,username)
        {
            state.username = username;
        }
    }
}