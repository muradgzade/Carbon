import Home from "./Pages/Home/Home"
import Login from "./Pages/Login/Login"
import Register from "./Pages/Register/Register"



export const router = [
    {
        id: Math.floor(Math.random()*1000),
        component:<Home/>,
        path:"/home",
        names:"Home"
    },
    {
        id: Math.floor(Math.random()*1000),
        component:<Login/>,
        path:"/",
        names:"Login"
    },
    {
        id: Math.floor(Math.random()*1000),
        component:<Register/>,
        path:"/about",
        names:"About"
    },
    
]

export default router