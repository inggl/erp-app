import {DashboardActionTypes} from "../types/dashboardTypes";
import {Dashboard} from "../../interfaces/dashboard";

export const dashboardConnect = () => {
    return (
        {
            type: DashboardActionTypes.DASHBOARD_CONNECT
        }
    );
}

export const addDashboardMessage = (message: Dashboard) => {
    return (
        {
            type: DashboardActionTypes.DASHBOARD_MESSAGE,
            payload: message
        }
    );
}