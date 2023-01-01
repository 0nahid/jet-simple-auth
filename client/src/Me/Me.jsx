import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { ImFacebook2, ImGithub, ImLinkedin } from "react-icons/im";
import { AuthContext } from "../Context/AuthProvider";
import Loading from "../Shared/Loader";
import auth from "../firebase.init";

export default function Portfolio() {
    const { theme, loading } = useContext(AuthContext);
    const [user] = useAuthState(auth);
    const [getUser, setGetUser] = useState('');
    // console.log(process.env.REACT_APP_SERVER_URL);
    // console.log('me page user', user.email);
    let darkFont = theme ? 'text-info' : 'text-black';
    let socialIconStyle = theme ? `h-7 w-7 hover:text-info` : "h-7 w-7 hover:text-secondary";

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/user/${user?.email}`, {
            headers: {
                "authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                // console.log(`user`, res?.data);
                setGetUser(res?.data?.data);
            })
    }, [user?.email])

    // console.log(getUser);

    if (loading || getUser.length === 0) {
        return <Loading />
    }

    return (
        <>
            <div className="min-h-screen">
                <div>
                    <div className="card card-compact max-w-lg bg-base-100 shadow-xl mx-auto mt-5">
                        <div className="avatar">
                            <div className="mx-auto w-32 md:w-48 mt-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={
                                    user.photoURL
                                } alt=
                                    {user.displayName}
                                />
                            </div>
                        </div>
                        <div className="mx-auto text-center mt-5 mb-6">
                            <h1 className="text-3xl font-bold">{user?.displayName}</h1>
                            <p className="text-sm font-bold">Full Stack Web developer</p>
                            <p className=""> <span className={darkFont + " underline mr-1"}>Email:</span>
                                {getUser?.email} </p>
                            <p>Uid:{getUser?.uid}</p>
                            <span>_Id: {getUser?._id}</span>
                            <div className="flex mt-5 justify-center">
                                <a href="https://www.facebook.com/hashtagnahid" target="_blank" rel="noreferrer" className="mr-5"><ImFacebook2 className={socialIconStyle} /></a>
                                <a href="https://www.linkedin.com/in/nahid-hassan-bulbul/" target="_blank" rel="noreferrer" className="mr-5"><ImLinkedin className={socialIconStyle} /></a>
                                <a href="https://github.com/0nahid/" target="_blank" rel="noreferrer" className="mr-5"><ImGithub className={socialIconStyle} /></a>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}