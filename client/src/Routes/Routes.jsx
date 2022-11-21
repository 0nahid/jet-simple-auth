import { createBrowserRouter } from "react-router-dom";
import Login from "../Auth/Login";
import RequireAuth from "../Auth/RequireAuth";
import Home from "../Home/Home";
import Main from "../Main/Main";
import Portfolio from "../Me/Me";
import Page404 from "../Shared/Page404";
import Users from "../Users/Users";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <Page404 />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/me",
                element: <RequireAuth><Portfolio /></RequireAuth>,
            },
            {
                path: "/users",
                element: <RequireAuth><Users /></RequireAuth>,
            }
        ]
    }

])

export default router;