import React, { useContext } from 'react';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { toast } from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import auth from '../firebase.init';
import useToken from '../hooks/useToken';

import Loading from '../Shared/Loader';

export default function Login() {
    const { theme } = useContext(AuthContext);
    const [signInWithGoogle, gUser, gLoading] = useSignInWithGoogle(auth);
    console.log(`google user`, gUser);
    const [user] = useAuthState(auth);
    console.log('after login', user);
    const [token] = useToken(user);
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    // // console.log(user);
    // useEffect(() => {
    //     if (token) {
    //         navigate(from, { replace: true });
    //         toast.success(`Welcome Back, ${auth?.currentUser?.displayName}`, {
    //             autoClose: 4000,
    //         })
    //         navigate('/');
    //     }
    // }, [from, token, navigate])

    if (user?.email && token) {
        toast.success(`Welcome Back, ${auth?.currentUser?.displayName}`, {
            autoClose: 4000,
        })
        navigate(from, { replace: true });
    }
    if (gLoading) {
        return <Loading />
    }

    return (
        <div className="flex h-screen justify-center items-center px-4 lg:px-12">
            <div className="card backdrop-blur-2xl transition-colors duration-500">
                <div className="form-control w-full max-w-xs">
                    <button className="btn btn-outline btn-dark text-black font-bold"
                        onClick={() => signInWithGoogle()}
                    ><FcGoogle className="w-6 h-6 mr-1" />
                        <span className={
                            theme ? "text-white" : "text-black"
                        }>Login with Google</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
