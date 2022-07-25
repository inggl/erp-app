import thunk from "redux-thunk";
import {rootReducer} from "./reducers/rootReducer"
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "./sagas/rootSaga";
import {configureStore} from "@reduxjs/toolkit";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({reducer: rootReducer, middleware: [thunk, sagaMiddleware], devTools: true});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;