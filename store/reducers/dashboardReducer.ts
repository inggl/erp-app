import {DashboardActions, DashboardActionTypes, DashboardState} from "../types/dashboardTypes";
import {Reducer} from "redux";
import produce from "immer";

const initialState: DashboardState = {
    dashboard: {
        total: 0
    },
}

export const dashboardReducer: Reducer<DashboardState, DashboardActions> = produce((draft: DashboardState, action: DashboardActions) => {
    switch (action.type) {
        case DashboardActionTypes.DASHBOARD_CONNECT:
            return draft;
        case DashboardActionTypes.DASHBOARD_MESSAGE:
            draft.dashboard = action.payload
            return draft;
        default:
            return draft
    }
}, initialState);