import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { ImFacebook2, ImGithub, ImLinkedin } from "react-icons/im";
import { AuthContext } from "../Context/AuthProvider";
import auth from "../firebase.init";

export default function Portfolio() {
    const { theme } = useContext(AuthContext);
    const [user] = useAuthState(auth)
    let darkFont = theme ? 'text-info' : 'text-black';
    let socialIconStyle = theme ? `h-7 w-7 hover:text-info` : "h-7 w-7 hover:text-secondary";

    return (
        <>
            <div className="min-h-screen">
                <div>
                    <div className="card card-compact max-w-lg bg-base-100 shadow-xl mx-auto mt-5">
                        <div className="avatar">
                            <div className="mx-auto w-32 md:w-48 mt-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={
                                    user?.photoURL
                                } alt="Nahid" />
                            </div>
                        </div>
                        <div className="mx-auto text-center mt-5 mb-6">
                            <h1 className="text-3xl font-bold">{user?.displayName}</h1>
                            <p className="text-sm font-bold">Full Stack Web developer</p>
                            <p className=""> <span className={darkFont + " underline mr-1"}>Email:</span>
                                {user?.email} </p>
                            <p>Uid:{user?.uid}</p>
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