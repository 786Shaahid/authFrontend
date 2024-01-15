
import {combineReducers, configureStore} from "@reduxjs/toolkit"
 import { authReducer } from "./reducers/userReducer";
 import { friendReducer } from "./reducers/userFriend";
 import { chatReducer } from "./reducers/chatReducer";

export const 
store= configureStore({
    reducer:combineReducers({
        authReducer,
        friendReducer,
        chatReducer
    }),
    // middleware:(getDefaultMiddleware)=>{
    //     getDefaultMiddleware({
    //         serializableCheck:false
    //     })
    // }
})