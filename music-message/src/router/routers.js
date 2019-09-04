const routes= [
    {
       path:"/",
       redirect:"/music"
    },
    {
      path:"/music",
      component:() => import("@/views/music.vue")
    },
    {
        path:"/login",
        component:()=> import("@/views/login.vue")
    },
    {
        path:"/register",
        component:()=> import("@/views/register.vue")
    },
    {
        path:"*",
        component:()=> import("@/views/404.vue")
    }
]
export default routes
