import {Dashboard} from "../../interfaces/dashboard";

export interface DashboardState {
    dashboard: Dashboard
}

export enum DashboardActionTypes {
    DASHBOARD_CONNECT = "DASHBOARD_CONNECT",
    DASHBOARD_MESSAGE = "DASHBOARD_MESSAGE"
}

export interface DashboardOpen {
    type: DashboardActionTypes.DASHBOARD_CONNECT
}

export interface DashboardMessage {
    type: DashboardActionTypes.DASHBOARD_MESSAGE,
    payload: Dashboard
}

export type DashboardActions = DashboardOpen | DashboardMessage;