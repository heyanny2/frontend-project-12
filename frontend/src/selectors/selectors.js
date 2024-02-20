import {messagesAdapter} from "../slices/messageSlice";
import {channelsAdapter} from "../slices/channelSlice";

export const channelsSelector = channelsAdapter.getSelectors((state) => state.channels);
export const messagesSelector = messagesAdapter.getSelectors((state) => state.messages)