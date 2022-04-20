const express = require("express");
const router = express.Router();
const { create, list, read, update, removeSoft } = require("../controllers/subcategory");

router.post("/subcategory", create);
router.get("/subcategories", list);
router.get("/subcategory/:slug", read);
router.put("/subcategory/:slug", update);
router.patch("/subcategory/:slug", removeSoft);

module.exports = router;