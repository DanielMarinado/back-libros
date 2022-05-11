const express = require("express");
const router = express.Router();
const { create, list, read, update, removeSoft } = require("../controllers/editorial");

/**
 * @swagger
 * /editorial:
 *   post:
 *     summary:  Create Editorial
 *     tags: 
 *       - name: "Editorial"
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Editorial"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Editorial"
 *       400:
 *         description: bad request
 */    
router.post("/editorial", create);

/**
 * @swagger
 * /editorials:
 *   get:
 *     tags:
 *       - name: "Editorial"
 *     summary: "Obtiene lista de Editoriales"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/editorials", list);

/**
 * @swagger
 * /editorial/{slug}:
 *   get:
 *     tags:
 *       - name: "Editorial"
 *     summary: "Muestra la data de una Editorial"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Muestra data de una Editorial activa"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/editorial/:slug", read);

/**
 * @swagger
 * /editorial/{slug}:
 *   put:
 *     tags:
 *       - name: "Editorial"
 *     summary: "Actualiza la data de una Editorial"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Actualiza data de una Editorial activa"
 *         required: true
 *         type: "string"
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Editorial"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.put("/editorial/:slug", update);

/**
 * @swagger
 * /editorial/{slug}:
 *   patch:
 *     tags:
 *       - name: "Editorial"
 *     summary: "Elimina lógicamente una editorial"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Elimina una editorial activa"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.patch("/editorial/:slug", removeSoft);

module.exports = router;

// SCHEMAS
/**
 * @swagger
 * components:
 *   schemas:
 *     Editorial: 
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
 *         name: DoubleDay
 *         slug: doubleday
 *         status: Active
 */  