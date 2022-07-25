import {AuthActions, AuthActionTypes, User} from "../types/authTypes";
import {Dispatch} from "redux";

export const login = (user: User) => {
    return (dispatch: Dispatch<AuthActions>) => {
        dispatch({
            type: AuthActionTypes.LOGIN,
            payload: user
        });
    }
}

export const logout = () => {
    return (dispatch: Dispatch<AuthActions>) => {
        dispatch({
            type: AuthActionTypes.LOGOUT
        });
    }
}