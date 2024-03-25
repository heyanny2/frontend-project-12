/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from 'react-redux';
import { TbPlaylistAdd } from 'react-icons/tb';
import { Col, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { channelsSelector } from '../../../selectors/selectors';
import { setCurrentChannel } from '../../../slices/channelSlice';
import { openModalWindow } from '../../../slices/modalWindowSlice';
import Channel from './Channel';

const ChannelsPanel = () => {
  const channels = useSelector(channelsSelector.selectAll);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSetCurrentChannel = (id) => {
    dispatch(setCurrentChannel(id));
  };

  const handleCreateNewChannel = () => {
    dispatch(openModalWindow({ type: 'add', relevantChannel: null }));
  };

  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channel.channels')}</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={handleCreateNewChannel}
        >
          <TbPlaylistAdd />
          <span className="visually-hidden">{t('channel.addBtn')}</span>
        </button>
      </div>
      <Nav
        variant="pills"
        className="flex-column nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map((channel) => (
          <Channel
            channel={channel}
            onClick={() => handleSetCurrentChannel(channel.id)}
            key={channel.id}
          />
        ))}
      </Nav>
    </Col>
  );
};

export default ChannelsPanel;
