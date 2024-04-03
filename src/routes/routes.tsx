import { createBrowserRouter } from "react-router-dom"
import Login from "../Pages/Login/Login"
import Admin from "../Templates/Admin"
import Authenticate from "../Loader/Authenticate"
import Driver from "../Templates/Driver"
import adminRoutes from "./admin.routes"
import driverRoutes from "./driver.routes"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
        loader: Authenticate.isSignIn
    },
    {
        path: "/admin",
        element: <Admin />,
        children: adminRoutes,
        loader: Authenticate.notSignIn
    },
    {
        path: "/driver",
        element: <Driver />,
        children: driverRoutes,
        loader: Authenticate.notSignIn
    }
])

export default router
