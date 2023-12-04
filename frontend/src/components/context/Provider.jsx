import UserDataContext from './UserDataContext';

import {useState} from "react";

const UserDataContextProvider = ({ children }) => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    
    const [userData, setUserData] = useState(currentUser);
    console.log(userData)

    const logIn = () => {
        localStorage.setItem('user', JSON.stringify(setUserData(userData)));
        setUserData('userData')
    }

    const logOut = () => {
        localStorage.removeItem('user')
        setUserData(null)
    }

    // const singIn - добавить

    return (
        <UserDataContext.Provider value={{ userData, logIn, logOut }}>
            {children}
        </UserDataContext.Provider>
    )
}

export default UserDataContextProvider;