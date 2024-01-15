import { useState, createContext } from "react";

//const UserDataContext = createContext({});
import UserDataContext from "./UserDataContext";

const UserDataContextProvider = ({ children }) => {
    const currentUser = JSON.parse(localStorage.getItem('user')) ?? null;

    const [userData, setUserData] = useState(currentUser);
    //console.log(userData)

    const logIn = (data) => {
        localStorage.setItem('user', JSON.stringify(data));
        setUserData(data)
    }

    const logOut = () => {
        localStorage.removeItem('user')
        setUserData(null)
    }

    return (
        <UserDataContext.Provider value={{ userData, logIn, logOut }}>
            {children}
        </UserDataContext.Provider>
    )
}

export default UserDataContextProvider;