import {call, put, take} from 'redux-saga/effects'
import {END, eventChannel} from 'redux-saga'
import {addDashboardMessage} from "../actions/dashboardActions";

const wsUrl = "ws://localhost:8082/ws/dashboard";

function createSocketChannel(socket: WebSocket) {
    return eventChannel(emit => {
        socket.onopen = () => {
            console.log("socket opened")
        }

        socket.onmessage = (event: MessageEvent) => {
            emit(event.data);
        }

        socket.onclose = (event) => {
            console.log("socket closed: ", event.reason)
        }

        return () => {
            socket.close();
            emit(END);
        };
    })
}

export function* connect(): any {
    while (!process.env.MOCK) {
        const socket: WebSocket = new WebSocket(wsUrl);
        const socketChannel = yield call(createSocketChannel, socket);
        const event: MessageEvent = yield take(socketChannel);
        yield put(addDashboardMessage(event.data));
    }
}

const dashboardSagas = [
    connect()
]

export default dashboardSagas;
