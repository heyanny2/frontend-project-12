import Message from "./Message";
import { useEffect, useRef } from 'react';

const MessageBox = ({ currentChannelMessages }) => {
  const refMessages = useRef(null);

  useEffect(() => {
    refMessages.current?.lastElementChild?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [currentChannelMessages]);

  return (
    <div ref={refMessages} id="messages-box" className="chat-messages overflow-auto px-5">
      {currentChannelMessages.map((message) => <Message message={message} key={message.id} />)}
    </div>
  )
};

export default MessageBox;