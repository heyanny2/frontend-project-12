import ChannelsPanel from "../components/chat/ChannelsPanel";
import ChatPanel from "../components/chat/ChatPanel";
import { useChatApi } from "../hooks/hooks";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import fetchInitialData from "../context/InitialDataThunk";
import ModalWindow from "../components/modal/ModalWindow";
import MessageBox from "../components/chat/Messages/MessageBox";
import { messagesSelector, currentChannel } from "../selectors/selectors";
import MessageForm from "../components/chat/Messages/MessageForm";

const Home = () => {
  const { connectSocket, disconnectSocket, getChannelsData } = useChatApi();
  const dispatch = useDispatch();
  const messages = useSelector(messagesSelector.selectAll);
  const currentChannelData = useSelector(currentChannel);
  const currentChannelName = currentChannelData?.name;
  const currentChannelMessages = messages.filter(
    (message) => message.сhannelId === currentChannelData?.id,
  );
  const currentChannelMessagesCount = currentChannelMessages.length;

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
          <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <ChatPanel 
              currentChannelName={currentChannelName}
              currentChannelMessagesCount={currentChannelMessagesCount}
            />
            <MessageBox currentChannelMessages={currentChannelMessages} />
            <MessageForm />
          </div>
        </div>  
      </div>
    </div>
  );
};

export default Home;