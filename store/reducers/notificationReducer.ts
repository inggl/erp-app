import {Reducer} from "redux";
import produce from "immer";
import {NotificationActions, NotificationActionTypes, NotificationState} from "../types/notificationTypes";

const initialState: NotificationState = {
    loading: false,
    notifications: [],
    error: undefined,
}

export const notificationReducer: Reducer<NotificationState, NotificationActions> = produce((draft: NotificationState, action: NotificationActions) => {
    switch (action.type) {
        case NotificationActionTypes.NOTIFICATION_SUBSCRIBE:
            return draft;
        case NotificationActionTypes.NOTIFICATION_SET:
            draft.loading = false;
            draft.error = null;
            draft.notifications = action.payload;
            return draft;
        case NotificationActionTypes.NOTIFICATION_GET_REQUEST:
            draft.loading = true;
            draft.error = null;
            return draft;
        case NotificationActionTypes.NOTIFICATION_GET_SUCCESS:
            draft.loading = false;
            draft.error = null;
            draft.notifications = action.payload;
            return draft;
        case NotificationActionTypes.NOTIFICATION_GET_ERROR:
            draft.loading = false;
            draft.error = action.payload;
            return draft;
        case NotificationActionTypes.NOTIFICATION_ADD:
            draft.notifications.push(action.payload)
            return draft;
        default:
            return draft
    }
}, initialState);