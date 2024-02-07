import {createContext, useState} from "react";

export const SocketContext = createContext({});

const SocketContextProvider = ({ socket, children }) => {
    const addNewMessage = (message, username) => {
        socket.on('newMessage', (payload) => {
            console.log(payload);
        });

        socket.emit('newMessage', { message: message, channelId: 1, username });
    };

    return (
        <SocketContext.Provider value={{ addNewMessage }}>
            {children}
        </SocketContext.Provider>
    )

};

export default SocketContextProvider;