const express = require("express");
const router = express.Router();
const { create, list, read, update, removeSoft } = require("../controllers/country");

/**
 * @swagger
 * /country:
 *   post:
 *     summary:  Create Country
 *     tags: 
 *       - name: "Country"
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Country"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Country"
 *       400:
 *         description: bad request
 */    
router.post("/country", create);

/**
 * @swagger
 * /countryes:
 *   get:
 *     tags:
 *       - name: "Country"
 *     summary: "Obtiene lista de Country's"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/countryes", list);

/**
 * @swagger
 * /country/{slug}:
 *   get:
 *     tags:
 *       - name: "Country"
 *     summary: "Muestra la data de Country"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Muestra data de Country activo"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/country/:slug", read);

/**
 * @swagger
 * /country/{slug}:
 *   put:
 *     tags:
 *       - name: "Country"
 *     summary: "Actualiza la data de Country"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Actualiza data de Country activa"
 *         required: true
 *         type: "string"
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Country"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.put("/country/:slug", update);

/**
 * @swagger
 * /country/{slug}:
 *   patch:
 *     tags:
 *       - name: "Country"
 *     summary: "Elimina lógicamente Country"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Elimina una Country activa"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.patch("/country/:slug", removeSoft);

module.exports = router;

// SCHEMAS
/**
 * @swagger
 * components:
 *   schemas:
 *     Country: 
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
 *         name: Chile
 *         slug: chile
 *         status: Active
 */  