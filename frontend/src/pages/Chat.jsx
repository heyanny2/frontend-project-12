import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import { Container, Row } from 'react-bootstrap';
import { useChatApi, useAuthorization } from '../hooks/hooks';
import { messagesSelector, currentChannel } from '../selectors/selectors';
import fetchInitialData from '../context/InitialDataThunk';
import ChannelsPanel from '../components/chat/Channels/ChannelsPanel';
import ChatPanel from '../components/chat/ChatPanel';
import ModalWindow from '../components/modal/ModalWindow';
import MessageBox from '../components/chat/Messages/MessageBox';
import MessageForm from '../components/chat/Messages/MessageForm';
import { appRoutes } from '../routes';
import '../components/style.css';

const Home = () => {
  const { t } = useTranslation();
  const { getChannelsData } = useChatApi();
  const rollbar = useRollbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logOut } = useAuthorization();
  const messages = useSelector(messagesSelector.selectAll);
  const currentChannelData = useSelector(currentChannel);
  const currentChannelName = currentChannelData?.name;
  const currentChannelMessages = messages.filter(
    (message) => message.сhannelId === currentChannelData?.id,
  );
  const currentChannelMessagesCount = currentChannelMessages.length;
  const loadingStatus = useSelector((state) => state?.loading?.serverData);

  useEffect(() => {
    dispatch(fetchInitialData(getChannelsData));
  }, [dispatch, getChannelsData]);

  useEffect(() => {
    if (loadingStatus === 'failed') {
      logOut();
      navigate(appRoutes.loginPagePath());
      toast.error(t('toast.networkError'));
      rollbar.error('ChatFailed');
    }

    if (loadingStatus === 'authError') {
      logOut();
      navigate(appRoutes.loginPagePath());
      toast.error(t('toast.authError'));
      rollbar.error('AuthFailed');
    }
  }, [loadingStatus, logOut, navigate, rollbar, t]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
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
      </Row>
    </Container>
  );
};

export default Home;
