import {useSelector, useDispatch} from "react-redux";
import { TbPlaylistAdd } from "react-icons/tb";
import {channelsSelector, modalWindowSelector} from '../../selectors/selectors'
import { setCurrentChannel } from "../../slices/channelSlice";
import { openModalWindow, setCurrentModalType } from "../../slices/modalWindowSlice";
import './style.css'
import Channel from "./Channel";
import { useTranslation } from "react-i18next";

const ChannelsPanel = ({}) => {
  const channels = useSelector(channelsSelector.selectAll);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSetCurrentChannel = (id) => {
    dispatch(setCurrentChannel(id));
  };

  const handleCreateNewChannel = () => {
    dispatch(setCurrentModalType('add'));
    dispatch(openModalWindow());
  };

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b className="channels-title">{t('channel.channels')}</b>
            <button type="button" className="p-0 btn-link btn btn-group-vertical add-channel-button" data-toggle="modal" onClick={handleCreateNewChannel}>
              <TbPlaylistAdd className="add-icon"/>
              <span className="visually-hidden">+</span>
            </button>
        </div>
        <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => <Channel channel={channel} onClick={() => handleSetCurrentChannel(channel.id)} />)}
        </ul>
    </div>
  )
};

export default ChannelsPanel;