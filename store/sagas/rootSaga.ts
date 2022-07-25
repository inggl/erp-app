import {all} from "redux-saga/effects"
import notificationSagas from "./notificationSagas";
import dashboardSagas from "./dashboardSagas";

export function* rootSaga() {
    const sagas = [
        ...notificationSagas,
        ...dashboardSagas,
    ]

    yield all(sagas);
}