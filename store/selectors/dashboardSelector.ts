import {createSelector, createStructuredSelector, Selector} from "reselect";
import {DashboardState} from "../types/dashboardTypes";
import {Dashboard} from "../../interfaces/dashboard";

const selectDashboardState = (state: DashboardState) => {
    return state;
};

const selectDashboard: Selector<DashboardState, Dashboard> = createSelector(selectDashboardState, state => state.dashboard);

export const dashboardSelector = createStructuredSelector({
    dashboard: selectDashboard,
});