import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../firebase.init";
import Loading from "../Shared/Loader";


export default function RequireAuth({ children }) {
    const [user, loading] = useAuthState(auth)
    const location = useLocation();
    if (loading) {
        <Loading />
    }
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} />
    }
    return children;
}