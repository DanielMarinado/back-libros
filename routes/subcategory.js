const express = require("express");
const router = express.Router();
const { create, list, read, update, removeSoft } = require("../controllers/subcategory");

/**
 * @swagger
 * /subcategory:
 *   post:
 *     summary:  Create Subcategory
 *     tags: 
 *       - name: "Subcategory"
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Subcategory"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Subcategory"
 *       400:
 *         description: bad request
 */ 
router.post("/subcategory", create);

/**
 * @swagger
 * /subcategories:
 *   get:
 *     tags:
 *       - name: "Subcategory"
 *     summary: "Obtiene lista de Subcategory's"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/subcategories", list);

/**
 * @swagger
 * /subcategory/{slug}:
 *   get:
 *     tags:
 *       - name: "Subcategory"
 *     summary: "Muestra la data de una Subcategory"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Muestra data de una Subcategory activa"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/subcategory/:slug", read);

/**
 * @swagger
 * /subcategory/{slug}:
 *   put:
 *     tags:
 *       - name: "Subcategory"
 *     summary: "Actualiza la data de una Subcategory"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Actualiza data de una Subcategory activa"
 *         required: true
 *         type: "string"
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Subcategory"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.put("/subcategory/:slug", update);

/**
 * @swagger
 * /subcategory/{slug}:
 *   patch:
 *     tags:
 *       - name: "Subcategory"
 *     summary: "Elimina lógicamente una Subcategory"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Elimina una Subcategory activa"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.patch("/subcategory/:slug", removeSoft);

module.exports = router;

// SCHEMAS
/**
 * @swagger
 * components:
 *   schemas:
 *     Subcategory: 
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
 *         name: Suspenso
 *         slug: suspenso
 *         parent: "625de58859f95d0a21d0d71a"
 *         status: Active
 */  