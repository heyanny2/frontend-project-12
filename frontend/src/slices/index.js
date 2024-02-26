import {configureStore} from "@reduxjs/toolkit";
import channelReducer from './channelSlice';
import messageReducer from './messageSlice';

export default configureStore({
    reducer: {
        channels: channelReducer,
        messages: messageReducer,
    }
})