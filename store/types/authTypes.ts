export interface AuthState {
    user: User
}

export interface User {
    profile?: any
    roles?: any
}

export enum AuthActionTypes {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
}

interface LoginAction {
    type: AuthActionTypes.LOGIN
    payload: User
}

interface LogoutAction {
    type: AuthActionTypes.LOGOUT
}

export type AuthActions = LoginAction | LogoutAction;