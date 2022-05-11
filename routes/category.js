const express = require("express");
const router = express.Router();
const { create, list, read, update, removeSoft } = require("../controllers/category");
const { authCheck, adminCheck } = require("../middlewares/auth");

/**
 * @swagger
 * /category:
 *   post:
 *     summary:  Create Category
 *     tags: 
 *       - name: "Category"
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

/**
 * @swagger
 * /categories:
 *   get:
 *     tags:
 *       - name: "Category"
 *     summary: "Obtiene lista de category's"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/categories", list);

/**
 * @swagger
 * /category/{slug}:
 *   get:
 *     tags:
 *       - name: "Category"
 *     summary: "Muestra la data de una Category"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Muestra data de una Category activa"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/category/:slug", read);

/**
 * @swagger
 * /category/{slug}:
 *   put:
 *     tags:
 *       - name: "Category"
 *     summary: "Actualiza la data de una Category"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Actualiza data de una Category activa"
 *         required: true
 *         type: "string"
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Category"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.put("/category/:slug", authCheck, adminCheck, update);

/**
 * @swagger
 * /category/{slug}:
 *   patch:
 *     tags:
 *       - name: "Category"
 *     summary: "Elimina lógicamente una category"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Elimina una category activa"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
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