const express = require("express");
const router = express.Router();
const { create, list, read, update, removeSoft } = require("../controllers/country");

router.post("/country", create);
router.get("/countryes", list);
router.get("/country/:slug", read);
router.put("/country/:slug", update);
router.patch("/country/:slug", removeSoft);

module.exports = router;