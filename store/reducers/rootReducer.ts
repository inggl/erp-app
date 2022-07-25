import {combineReducers} from "redux";
import {authReducer} from "./authReducer";
import {notificationReducer} from "./notificationReducer";
import {dashboardReducer} from "./dashboardReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    notification: notificationReducer,
    dashboard: dashboardReducer
});