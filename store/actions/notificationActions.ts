import {NotificationActionTypes} from "../types/notificationTypes";
import {Notification} from '../../interfaces/notification'

export const notificationSubscribe = () => {
    return (
        {
            type: NotificationActionTypes.NOTIFICATION_SUBSCRIBE
        }
    );
}

export const getNotificationRequest = () => {
    return ({
        type: NotificationActionTypes.NOTIFICATION_GET_REQUEST
    })
}

export const setNotifications = (notifications: Notification[]) => {
    return ({
        type: NotificationActionTypes.NOTIFICATION_SET,
        payload: notifications
    })
}

export const getNotificationSuccess = (notifications: Notification[]) => {
    return ({
        type: NotificationActionTypes.NOTIFICATION_GET_SUCCESS,
        payload: notifications
    })
}

export const getNotificationError = (error: any) => {
    return ({
        type: NotificationActionTypes.NOTIFICATION_GET_ERROR,
        payload: error
    })
}

export const addNotification = (notification: Notification) => {
    return ({
        type: NotificationActionTypes.NOTIFICATION_ADD,
        payload: notification
    })
}