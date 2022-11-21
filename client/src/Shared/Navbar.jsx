import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import auth from "../firebase.init";
import useAdmin from "../hooks/useAdmin";


export default function Navbar() {
    const { handleThemeChange, theme } = useContext(AuthContext);
    const [user] = useAuthState(auth)
    const [admin] = useAdmin(user);
    console.log('navbar', user?.auth?.currentUser?.photoURL);
    const Navmenu = (
        <>
            {
                user && <Link to="/me" > <button className="btn  btn-outline ml-2 mb-2 md:mb-0 mr-2">Me</button></Link>
            }
            {
                admin && <Link to="/users" > <button className="btn  btn-outline ml-2 mb-2 md:mb-0 mr-2">Users</button></Link>
            }
            {
                !user ? <Link to="/login" > <button className="btn  btn-outline ml-2 mb-2 md:mb-0">Login</button></Link> : <button className="btn btn-outline"
                    onClick={
                        () => auth.signOut()
                            .then(() => {
                                // remove user from local storage
                                localStorage.removeItem('aceessToken')
                            })
                    }
                >Logout</button>
            }


        </>
    );
    return (
        <div className="sticky top-0 z-40 backdrop-blur-2xl transition-colors duration-500">
            <div className="navbar container mx-auto">
                <div className="navbar-start">
                    <Link to="/" className="btn btn-ghost normal-case text-xl md:text-2xl"> JWT </Link>
                </div>
                <div className="navbar-end">
                    <button
                        onClick={handleThemeChange}
                        className="rounded-full lg:mx-2 font-bold pt-2 ml-2 -mt-2"
                    >
                        {theme ? (
                            <svg
                                className="swap-on fill-current w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                            </svg>
                        ) : (
                            <svg
                                className="swap-off fill-current w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                            </svg>
                        )}
                    </button>

                    <span className="hidden lg:flex">
                        {Navmenu}
                    </span>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {Navmenu}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )

}