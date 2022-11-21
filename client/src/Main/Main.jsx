import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import Navbar from '../Shared/Navbar';

export default function Main() {
    const { theme } = useContext(AuthContext);
    console.log(theme);
    return (
        <div className={
            theme ? 'heroDarkPattern' : 'heroLightPattern'
        }>
            <div className='container mx-auto'>
                <Navbar />
                <Outlet />
            </div>
        </div>

    )
}
