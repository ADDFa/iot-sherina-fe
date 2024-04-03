import type { RouteObject } from "react-router-dom"
import Dashboard from "../Pages/Admin/Dashboard/Dashboard"
import Driver from "../Pages/Admin/Driver/Driver"
import DetailDriver from "../Pages/Admin/Driver/Components/DetailDriver"

const routes: RouteObject[] = [
    {
        path: "dashboard",
        element: <Dashboard />
    },
    {
        path: "driver",
        element: <Driver />
    },
    {
        path: "driver/:id",
        element: <DetailDriver />
    }
]

export default routes
