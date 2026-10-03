import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./types";

export interface UserState {
    user: User | null,
    token: string | null;
}

const initialState : UserState = {
    user: JSON.parse(localStorage.getItem("user") ?? "null"),
    token: localStorage.getItem("token")
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCredentials(state, action: PayloadAction<{user: User, token: string }>) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user))
        },
        logout(state) {
            state.user = null,
            state.token = null,
            localStorage.removeItem("user"),
            localStorage.removeItem("token")
        },
    },
});

export const { setCredentials, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;