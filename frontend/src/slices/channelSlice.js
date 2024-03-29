/* eslint-disable no-param-reassign */
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import fetchInitialData from '../context/InitialDataThunk';

const channelsAdapter = createEntityAdapter();
const defaultCurrentChannelId = 1;

const initialState = channelsAdapter.getInitialState({ currentChannelId: defaultCurrentChannelId });

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    deleteChannel: (state, { payload }) => {
      if (state.currentChannelId === payload) {
        state.currentChannelId = defaultCurrentChannelId;
      }
      channelsAdapter.removeOne(state, payload);
    },
    renameChannel: channelsAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialData.fulfilled, (state, { payload }) => {
        channelsAdapter.setAll(state, payload.channels);
        state.currentChannelId = payload.currentChannelId;
      });
  },
});

export const {
  addChannel,
  addChannels,
  setCurrentChannel,
  deleteChannel,
  renameChannel,
} = channelSlice.actions;
export { channelsAdapter };
export default channelSlice.reducer;
