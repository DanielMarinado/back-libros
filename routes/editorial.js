const express = require("express");
const router = express.Router();
const { create, list, read, update, removeSoft } = require("../controllers/editorial");

router.post("/editorial", create);
router.get("/editorials", list);
router.get("/editorial/:slug", read);
router.put("/editorial/:slug", update);
router.patch("/editorial/:slug", removeSoft);

module.exports = router;