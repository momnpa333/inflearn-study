const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Product = require("../models/Product");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});
const upload = multer({ storage: storage }).single("file");

router.post("/image", auth, async (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return req.statusCode(500).send(err);
        }
        return res.json({ fileName: res.req.file.filename });
    });
});

router.post("/", auth, async (req, res, next) => {
    console.log(req.body);
    try {
        const product = new Product(req.body);
        product.save();
        return res.sendStatus(201);
    } catch (err) {
        next(err);
    }
});

router.get("/", async (req, res, next) => {
    console.log(req.body);
    try {
        const products = await Product.find().populate("writer");
        return res.status(200).json({ products });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
