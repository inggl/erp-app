import {call, put, take, takeEvery, takeLatest} from "redux-saga/effects";
import {END, eventChannel} from "redux-saga";
import {NotificationActionTypes} from "../types/notificationTypes";
import {addNotification, getNotificationError, getNotificationSuccess} from "../actions/notificationActions";
import axios, {AxiosResponse} from "axios";
import {EventChannel} from "@redux-saga/core";

const apiUrl = "http://localhost:8083";

function createEventSourceChannel(eventSource: EventSource) {
    return eventChannel(emit => {
        console.log("notification subscription")

        eventSource.onopen = ev => {
            console.info('notification connection is established');
            emit(ev);
        }

        eventSource.onerror = err => {
            console.error(err);
            emit(END);
        }

        eventSource.onmessage = ev => {
            emit(ev);
        }

        return () => {
            console.info("closing notification connection");
            eventSource.close();
            emit(END);
        }
    })
}

function* subscribe() {
    try {

        const eventSource: EventSource = new EventSource(`${apiUrl}/notifications/stream`, {
            withCredentials: true
        });

        const channel: EventChannel<EventSource> = yield call(createEventSourceChannel, eventSource);

        while (true) {
            let event: MessageEvent = yield take(channel);

            if (event.type === 'message') {
                const data = JSON.parse(event.data);

                yield put(addNotification(data));
            }
        }

    } catch (e) {
        console.error(e)
    }
}

function getNotifications() {
    return axios.get(`${apiUrl}/notifications`);
}

function* load() {
    try {
        const response: AxiosResponse = yield call(getNotifications);
        yield put(getNotificationSuccess(response.data));
    } catch (e: any) {
        yield put(getNotificationError(e));
    }
}

const notificationSagas = [
    takeLatest(NotificationActionTypes.NOTIFICATION_SUBSCRIBE, subscribe),
    takeEvery(NotificationActionTypes.NOTIFICATION_GET_REQUEST, load),
]

export default notificationSagas;