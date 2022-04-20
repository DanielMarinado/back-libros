const express = require("express");
const router = express.Router();
const { create, list, read, update, removeSoft } = require("../controllers/author");

router.post("/author", create);
router.get("/authors", list);
router.get("/author/:slug", read);
router.put("/author/:slug", update);
router.patch("/author/:slug", removeSoft);

module.exports = router;