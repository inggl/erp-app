import {Reducer} from "redux";
import produce from "immer";
import {AuthActions, AuthActionTypes, AuthState} from "../types/authTypes";

const initialState: AuthState = {
    user: {
        profile: undefined,
        roles: undefined
    }
}

export const authReducer: Reducer<AuthState, AuthActions> = produce((draft: AuthState, action: AuthActions) => {
    switch (action.type) {
        case AuthActionTypes.LOGIN:
            draft.user = action.payload
            break;
        case AuthActionTypes.LOGOUT:
            draft.user.profile = undefined
            draft.user.roles = undefined
            break;
        default:
            return draft
    }
}, initialState);