const express = require("express");
const User = require("../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.post("/", async (req, res, next) => {
    try {
        console.log(req);
        return res.sendStatus(200);
    } catch (e) {
        next(e);
    }
});

router.get("/", async (req, res) => {
    return res.json({
        storyCardId: "1",
        storyCardName: "첫번째 이야기",
        premise: "옛날 옛날 호랑이 담배피던 시절",
        setting: "5살 남자아이, 25살 어머니",
        characters: "남자아이는 온순, 어머니는 상냥",
        outline:
            "어머니가 떡을 팔러 혼자 시장에 갔다오는데 아이는 집에 혼자남아 어머니를 기다리고 있음",
    });
});

module.exports = router;
