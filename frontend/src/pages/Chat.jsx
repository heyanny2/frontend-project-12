import ChannelsPanel from "../components/chat/ChannelsPanel";
import ChatPanel from "../components/chat/ChatPanel";
import { useChatApi } from "../hooks/hooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import fetchInitialData from "../context/InitialDataThunk";
import ModalWindow from "../components/modal/ModalWindow";


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
          <ChannelsPanel />
          <ChatPanel />
         </div>
    </div>
  );
}

export default Home;