import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/userSlice";
import podcastReducer from "../Features/podcastSlice";
const store = configureStore({
    reducer:{
        user:userReducer,
        podcasts:podcastReducer
    }
})

export default store;