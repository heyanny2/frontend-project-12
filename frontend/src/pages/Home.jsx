import ChannelsPanel from "../components/chat/ChannelsPanel";
import ChatPanel from "../components/chat/ChatPanel";
import { useChatApi } from "../hooks/hooks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchInitialData from "../context/InitialDataThunk";
import ModalWindow from "../components/modal/ModalWindow";
import DeleteChannelModalWindow from "../components/modal/DeleteChannelModalWindow";


const Home = () => {
  const { connectSocket, disconnectSocket, getChannelsData } = useChatApi();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInitialData(getChannelsData));
    connectSocket();

    return () => {
      disconnectSocket();
    };
}, [connectSocket, disconnectSocket, dispatch, getChannelsData]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <ModalWindow />
          <DeleteChannelModalWindow />
          <ChannelsPanel />
          <ChatPanel />
         </div>
    </div>
  );
}

export default Home;