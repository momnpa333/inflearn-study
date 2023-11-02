const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = "supersecret";
let auth = async (req, res, next) => {
    //토큰을 request headers에서 가져외
    const authHeader = req.headers["authorization"];
    //Bearer  sdafsdaf.sdafsdaf.fasd
    const token = authHeader && authHeader.split(" ")[1];

    if (token === null) return res.sendStatus(401);

    try {
        //토큰이 유효한 토큰인지 확인
        const decode = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({ _id: decode.userId });
        console.log(user);
        if (!user) {
            return res.status(400).send("없는 유저입니다.");
        }
        req.user = user;
        next();
    } catch (e) {
        next(e);
    }
};

module.exports = auth;
