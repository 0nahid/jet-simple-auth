import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [theme, setTheme] = useState(false);

    useEffect(() => {
        setTheme(JSON.parse(window.localStorage.getItem("theme") || "false"));
    }, [])
    
    const handleThemeChange = () => {
        setTheme(!theme);
        window.localStorage.setItem("theme", JSON.stringify(!theme));
    }

    // value is the object that will be passed to the children
    const authInfo = {
        theme,
        handleThemeChange
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;