const express = require("express");
const User = require("../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.get("/auth", auth, async (req, res, next) => {
    return res.json({
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        image: req.user.image,
        cart: req.user.cart,
        history: req.user.history,
    });
});

router.post("/register", async (req, res, next) => {
    try {
        const user = new User(req.body);
        await user.save();
        return res.sendStatus(200);
    } catch (e) {
        next(e);
    }
});

router.post("/login", async (req, res, next) => {
    //req.body
    try {
        //존재하는 유저인지 체크
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).send("Auth failed, email not found");

            // 비밀번호가 올바는 것인지 체크
        }
        console.log(user);
        const isMatch = await user.comparePassword(req.body.password);
        if (!isMatch) {
            return res.status(400).send("Wrong password");
        }

        const payload = {
            userId: user._id.toHexString(),
        };
        //token을 생성
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        return res.json({ user, accessToken });
    } catch (e) {
        next(e);
    }
});

router.post("/logout", auth, async (req, res, next) => {
    try {
        return res.sendStatus(200);
    } catch (e) {
        next(e);
    }
});

router.post("/cart", auth, async (req, res, next) => {
    try {
        //먼저 user collction에 해당하는 유저정보 가져오기
        const userInfo = await User.findOne({ _id: req.user._id });
        //가져온 정보에서 카트에다 넣으려 하는 상품이 이미 들어있는지 확인
        let duplicate = false;
        userInfo.cart.forEach((item) => {
            if (item.id === req.body.productId) {
                duplicate = true;
            }
        });
        //이미 있을떄
        if (duplicate) {
            const user = await User.findOneAndUpdate(
                { _id: req.user._id, "cart.id": req.body.productId },
                { $inc: { "cart.$.quantity": 1 } },
                { new: true }
            );
            return res.status(201).send(user.cart);
        } else {
            const user = await User.findOneAndUpdate(
                { _id: req.user._id },
                {
                    $push: {
                        cart: {
                            id: req.body.productId,
                            quantity: 1,
                            date: Date.now(),
                        },
                    },
                },
                { new: true }
            );
            return res.status(201).send(user.cart);
        }
    } catch (e) {
        next(e);
    }
});
module.exports = router;
