import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import Loading from '../Shared/Loader';

export default function Users() {
    const [users, setUsers] = useState([]);
    const { theme, loading } = useContext(AuthContext);
    // console.log(theme);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/allusers`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => {
                console.log(`users`, res.data);
                setUsers(res.data);
            })
    }, [])
    // console.log(`users`, users);
    // console.log(`loading`, loading);
    if (loading || users.length === 0) {
        return <Loading />
    }
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
