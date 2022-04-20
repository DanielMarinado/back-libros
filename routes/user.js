const express = require("express");

const router = express.Router();

// const { create, read, remove, etc } = require("../controllers");
// const { authCheck, adminCheck } = require("../middlewares/auth");
// const { validateCreateProduct } = require("../validators");


// routes-endpoints - mala práctica
router.get("/user", (req, res, next) => {
    res.json({
        data: "le has pegado correctamente a este endpoint"
    })
});

// buena práctica
// router.post("/product", authCheck, validateCreateProduct, create)


module.exports = router;