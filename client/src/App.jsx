import React, { useContext, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { AuthContext } from './Context/AuthProvider';
import router from './Routes/Routes';
import Loading from './Shared/Loader';
export default function App() {
    const { theme } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);
    return (
        <div data-theme={
            theme ? "night" : "light"
        }
        >
            {
                loading ? <Loading /> : <>
                    <RouterProvider router={router}></RouterProvider>
                    <Toaster ></Toaster>
                </>
            }
        </div>
    );
}
