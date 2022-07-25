import {NotificationState} from "../types/notificationTypes";
import {createSelector, createStructuredSelector, Selector} from "reselect";
import {Notification} from "../../interfaces/notification";

const selectNotificationState = (state: NotificationState) => {
    return state;
};

const selectNotifications: Selector<NotificationState, Notification[]> = createSelector(selectNotificationState, state => state.notifications);

const selectNotificationsLoading: Selector<NotificationState, boolean> = createSelector(selectNotificationState, state => state.loading);

const selectNotificationsError: Selector<NotificationState, boolean> = createSelector(selectNotificationState, state => state.error);

export const notificationSelector = createStructuredSelector({
    notifications: selectNotifications,
    loading: selectNotificationsLoading,
    error: selectNotificationsError,
});