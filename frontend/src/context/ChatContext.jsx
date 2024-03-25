import { createContext, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addChannel, setCurrentChannel } from '../slices/channelSlice';

export const ChatContext = createContext({});

const ChatContextProvider = ({ socket, children }) => {
  const dispatch = useDispatch();
  const timeout = 4000;

  const addNewMessage = useCallback(
    async (message) => {
      await socket
        .timeout(timeout)
        .emit('newMessage', message);
    },
    [socket],
  );

  const addNewChannel = useCallback(
    async (channel) => {
      const { data } = await socket
        .timeout(timeout)
        .emitWithAck('newChannel', channel);
      dispatch(addChannel(data));
      dispatch(setCurrentChannel(data.id));
    },
    [socket, dispatch],
  );

  const removeSelectedChannel = useCallback(
    async (id) => {
      await socket
        .timeout(timeout)
        .emit('removeChannel', { id });
    },
    [socket],
  );

  const renameSelectedChannel = useCallback(
    async (newName) => {
      await socket
        .timeout(timeout)
        .emit('renameChannel', newName);
    },
    [socket],
  );

  const getChannelsData = useCallback(() => {
    const userId = JSON.parse(localStorage.getItem('user'));

    return userId?.token
      ? { Authorization: `Bearer ${userId.token}` }
      : {};
  }, []);

  const memoAuth = useMemo(
    () => ({
      addNewMessage,
      addNewChannel,
      removeSelectedChannel,
      renameSelectedChannel,
      getChannelsData,
    }),
    [
      addNewMessage,
      addNewChannel,
      removeSelectedChannel,
      renameSelectedChannel,
      getChannelsData,
    ],
  );

  return (
    <ChatContext.Provider value={memoAuth}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
