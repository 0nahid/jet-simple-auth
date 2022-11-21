import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthProvider';

export default function Users() {
    const [users, setUsers] = useState([]);
    const { theme } = useContext(AuthContext);
    const usersTheme =   theme ? 'bg-red-800' : 'bg-green-600';
    console.log(theme);
    useEffect(() => {
        axios.get(`http://localhost:5000/allusers`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => {
                console.log(`users`, res.data);
                setUsers(res.data);
            })
    }, [])
    console.log(`users`, users);
    return (
        <div className='min-h-screen'>
            <h1>Users</h1>
            {
                users?.map(user => {
                    return (
                        <div 
                        className={
                            // usersTheme 
                            
                            +
                            
                            ' p-4 m-4 rounded-lg'
                        } 
                        
                        key={user?.id}>
                            <p>{user?.email}</p>
                            <button className='btn btn-sm btn-primary'>test</button>
                        </div>
                    )
                })
            }
        </div>
    )
}
