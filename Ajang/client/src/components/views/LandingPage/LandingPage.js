import React, { useEffect, useReducer } from "react";
import axios from "axios";
import Auth from "../../../hoc/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../_actions/user_action";
// function Component(){
//     if
// }

function LandingPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let state;
    // useEffect(() => {
    //     dispatch(auth()).then((res) => {
    //         state = res;
    //     });
    // }, []);
    console.log(state);
    const onClickHandler = () => {
        axios.get("/api/users/logout").then((response) => {
            if (response.data.success) {
                window.location.href = "/login";
            } else {
                alert("로그아웃 하는데 실패 했습니다.");
            }
        });
    };
    // const Component = () => {
    //     if (state) {
    //         return <button onClick={onClickHandler}>로그아웃</button>;
    //     } else {
    //         return <button onClick={onClickHandler}>로그인</button>;
    //     }
    // };
    // const Main = () => {
    //     let response;
    //     useEffect(async () => {
    //         dispatch(auth())
    //             .then((res) => {
    //                 state = res;
    //                 if (state) {
    //                     return () => (
    //                         <button onClick={onClickHandler}>로그아웃</button>
    //                     );
    //                 } else {
    //                     return () => (
    //                         <button onClick={onClickHandler}>로그인</button>
    //                     );
    //                 }
    //             })
    //             .then((res) => console.log(res));
    //     }, []);
    // };
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100vh",
            }}
        >
            <h2>시작 페이지</h2>
            <button onClick={onClickHandler}>로그아웃</button>;
        </div>
    );
}

export default Auth(LandingPage, null);
