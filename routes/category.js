const express = require("express");
const router = express.Router();
const { create, list, read, update, removeSoft } = require("../controllers/category");
const { authCheck, adminCheck } = require("../middlewares/auth");

/**
 * @swagger
 * /category:
 *   post:
 *     summary:  Create Category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Category"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Category"
 *       400:
 *         description: bad request
 */    
router.post("/category", authCheck, adminCheck, create);

router.get("/categories", list);
router.get("/category/:slug", read);
router.put("/category/:slug", authCheck, adminCheck, update);
router.patch("/category/:slug", authCheck, adminCheck, removeSoft);

module.exports = router;

// SCHEMAS
/**
 * @swagger
 * components:
 *   schemas:
 *     Category: 
 *       type: object
 *       required:  
 *         - name
 *       properties: 
 *         name:
 *           type: string
 *           trim: true
 *           minlength: 2
 *           maxlength: 32
 *         slug:
 *           type: string
 *           unique: true
 *           lowecase: true
 *           index: true
 *         status: 
 *           type: string
 *           default: "Active"
 *           enum: 
 *           - "Active"
 *           - "Inactive" 
 *       example: 
 *         name: Ficcion
 *         slug: ficcion
 *         status: Active
 */  