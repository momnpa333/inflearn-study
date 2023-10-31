import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./thunkFunctions";
import { toast } from "react-toastify";

const initialState = {
    userData: {
        id: "",
        email: "",
        name: "",
        role: 0,
        image: "",
    },
    isAuth: false,
    isLoading: false,
    error: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                console.log(1);
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state) => {
                console.log(2);
                state.isLoading = false;
                toast.info("회원가입 성공함");
            })
            .addCase(registerUser.rejected, (state, action) => {
                console.log(3);
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userData = action.payload;
                toast.info("로그인 성공함");
                state.isAuth = true;
                localStorage.setItem("accessToken", action.payload.accessToken);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            });
    },
});

export default userSlice.reducer;
