import ChannelsPanel from "../components/chat/ChannelsPanel";
import ChatPanel from "../components/chat/ChatPanel";

const Home = () => {
    return (
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <ChannelsPanel />
            <ChatPanel />
          </div>
      </div>
    );
}

export default Home;