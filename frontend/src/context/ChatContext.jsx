import {createContext} from "react";
import {useDispatch} from "react-redux";
import {addMessage} from '../slices/messageSlice'
import {addChannel, deleteChannel} from "../slices/channelSlice";
import axios from "axios";
import { useAuthorization } from "../hooks/hooks";


export const ChatContext = createContext({});

const ChatContextProvider = ({ socket, children }) => {
    const { getUserToken } = useAuthorization();

    const dispatch = useDispatch();
    const timeout = 4000;

    const connectSocket = () => {
        socket.connect();
        socket.on('newMessage', (message) => {
            dispatch(addMessage(message));
        });
        socket.on('newChannel', (channel) => {
            dispatch(addChannel(channel));
        });
        socket.on('deleteChannel', (channel) => {
            dispatch(deleteChannel(channel));
        });
    };

    const disconnectSocket = () => {
        socket.off();
        socket.disconnect();
    };

    const addNewMessage = async (message) => {
        await socket
          .timeout(timeout)
          .emit('newMessage', { ...message });
    };

    const addNewChannel = async (channel) => {
        await socket
            .timeout(timeout)
            .emit('newChannel', { ...channel });

    };

    const deleteChannel = async (channel) => {

    };

    
    const getChannelsData = async () => {
        const response = await axios.get('/api/v1/data', {headers: {Authorization: `Bearer ${getUserToken()}`}})
        return response;
    };

    return (
        <ChatContext.Provider value={{ connectSocket, disconnectSocket, addNewMessage, addNewChannel, deleteChannel, getChannelsData }}>
            {children}
        </ChatContext.Provider>
    )
};

export default ChatContextProvider;