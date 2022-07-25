import {Notification} from '../../interfaces/notification'

export interface NotificationState {
    loading: boolean
    notifications: Notification[]
    error: any
}

export enum NotificationActionTypes {
    NOTIFICATION_SUBSCRIBE = "NOTIFICATION_SUBSCRIBE",
    NOTIFICATION_SET = "NOTIFICATION_SET",
    NOTIFICATION_GET_REQUEST = "NOTIFICATION_GET_REQUEST",
    NOTIFICATION_GET_SUCCESS = "NOTIFICATION_GET_SUCCESS",
    NOTIFICATION_GET_ERROR = "NOTIFICATION_GET_ERROR",
    NOTIFICATION_ADD = "NOTIFICATION_ADD",
}

interface NotificationSubscribe {
    type: NotificationActionTypes.NOTIFICATION_SUBSCRIBE
}

interface NotificationSet {
    type: NotificationActionTypes.NOTIFICATION_SET,
    payload: Notification[]
}

interface NotificationGetRequest {
    type: NotificationActionTypes.NOTIFICATION_GET_REQUEST,
    payload: Notification[]
}

interface NotificationGetSuccess {
    type: NotificationActionTypes.NOTIFICATION_GET_SUCCESS,
    payload: Notification[]
}

interface NotificationGetError {
    type: NotificationActionTypes.NOTIFICATION_GET_ERROR,
    payload: any
}

interface NotificationAdd {
    type: NotificationActionTypes.NOTIFICATION_ADD,
    payload: Notification
}

export type NotificationActions =
    NotificationSubscribe
    | NotificationSet
    | NotificationGetRequest
    | NotificationGetSuccess
    | NotificationGetError
    | NotificationAdd