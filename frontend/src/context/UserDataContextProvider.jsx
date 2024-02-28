import { useState, createContext } from "react";

export const UserDataContext = createContext({});

const UserDataContextProvider = ({ children }) => {
    const currentUser = JSON.parse(localStorage.getItem('user')) ?? null;

    const [userData, setUserData] = useState(currentUser);
    //console.log(userData)

    const logIn = (data) => {
        localStorage.setItem('user', JSON.stringify(data));
        setUserData(data);
    }

    const logOut = () => {
        localStorage.removeItem('user');
        setUserData(null);
    }

    const getUserName = () => userData.username;
    const getUserToken = () => userData.token;

    return (
        <UserDataContext.Provider value={{ userData, logIn, logOut, getUserName, getUserToken }}>
            {children}
        </UserDataContext.Provider>
    )
}

export default UserDataContextProvider;