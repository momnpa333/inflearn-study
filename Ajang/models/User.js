const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true, //space를 없애주는 역할
        unique: 1, //중복을 없애주는 역할
    },
    lastname: {
        type: String,
        maxlength: 50,
    },
    role: {
        //1:관리자,0:일반유저 등등
        type: Number,
        default: 0,
    },
    image: String,
    token: {
        //유효성 관리
        type: String,
    },
    tokenExp: {
        //토큰 유효기간
        type: Number,
    },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
