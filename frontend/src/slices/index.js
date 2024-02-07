import {configureStore} from "@reduxjs/toolkit";
import channelReducer from './channelSlice';

export default configureStore({
    reducer: {
        channels: channelReducer,
    }
})