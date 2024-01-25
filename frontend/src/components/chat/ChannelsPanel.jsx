import {useSelector, useDispatch} from "react-redux";
import { TbPlaylistAdd } from "react-icons/tb";

import './style.css'

const ChannelsPanel = () => {
    const channels = useSelector((state) => state.channels.channels);

    const mapped = channels.map((channel) => {
      return (
        <li className="nav-item w-100" key={channel.id}>
          <button type="button" className="w-100 rounded-0 text-start channel-button">
            <span className="me-1">#</span>
            {channel.name}
          </button>
        </li>
      )
    })

  return (
  <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>Каналы</b>
          <button type="button" className="p-0 text-primary btn btn-group-vertical">
            <TbPlaylistAdd className="add-channel-icon"/>
            <span className="visually-hidden">+</span>
          </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {mapped}
      </ul>
  </div>
  )
};

export default ChannelsPanel;