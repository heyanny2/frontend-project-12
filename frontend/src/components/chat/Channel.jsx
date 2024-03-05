import { useDispatch, useSelector } from "react-redux";
import {currentChannelSelector} from "../../selectors/selectors"
import './style.css'
import cn from 'classnames';
import { Link } from "react-router-dom";
import { openModalWindow } from "../../slices/modalWindowSlice";
import { useTranslation } from 'react-i18next';
import { useState } from "react";
import { setCurrentModalType, setRelevantChannel } from "../../slices/modalWindowSlice";


const Channel = ({ channel, onClick, isRemovable }) => {
  const currentChannel = useSelector(currentChannelSelector).id;
  const isActive = () => channel.id === currentChannel.id;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isBtnActive, setBtnActive] = useState(false);

  const menuClasses = cn("dropdown-menu", {
    'show': isBtnActive,
  });

  const handleSetBtnActive = (id) => {
    setBtnActive(!isBtnActive);
    dispatch(setRelevantChannel(id));
  }

  const channelClasses = cn("w-100 rounded-0 text-start channel-button", {
    'current': isActive(),
  })

  const channelMenuBtnClasses = cn("flex-grow-0 dropdown-toggle dropdown-toggle-split channel-menu-btn", {
    'current': isActive(),
  })

  const handleRenameChannel = () => {
    dispatch(setCurrentModalType('rename'));
    dispatch(openModalWindow());
  };

  const handleRemoveChannel = () => {
    dispatch(setCurrentModalType('remove'));
    dispatch(openModalWindow());
  };

  if (isRemovable) {
  return (
    <li className="nav-item w-100 channel" key={channel.id}>
      <div role="group" className="d-flex dropdown btn-group">
        <button type="button" className={channelClasses} onClick={onClick}>
          <span className="me-1">#</span>
          {channel.name}
        </button>
        <button type="button" id="react-aria4736936024-3" aria-expanded="false" className={channelMenuBtnClasses} onClick={() => handleSetBtnActive(channel.id)}>
          <span className="visually-hidden">{t('channel.controlChannel')}</span>
        </button>
        <div x-placement="bottom-end" aria-labelledby="react-aria4736936024-3" className={menuClasses} data-popper-reference-hidden="false" data-popper-escaped="false" data-popper-placement="bottom-end">
          <Link className="dropdown-item" role="button" href="#" onClick={handleRemoveChannel}>{t('channel.removeChannel')}</Link>
          <Link className="dropdown-item" role="button" href="#" onClick={handleRenameChannel}>{t('channel.renameChannel')}</Link>
        </div>
      </div>
    </li>
  )
} else if(!isRemovable) {
    return (
        <li className="nav-item w-100 channel" key={channel.id}>
            <div role="group" className="d-flex dropdown btn-group">
                <button type="button" className={channelClasses} onClick={onClick}>
                    <span className="me-1">#</span>
                    {channel.name}
                </button>
            </div>    
        </li>
    )
}
}

export default Channel;