const express = require("express");
const router = express.Router();
const { create, list, read, update, removeSoft } = require("../controllers/author");

/**
 * @swagger
 * /author:
 *   post:
 *     summary:  Crear author
 *     tags:
 *       - name: "Author"
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Author"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Author"
 *       400:
 *         description: bad request
 */    
router.post("/author", create);

/**
 * @swagger
 * /authors:
 *   get:
 *     tags:
 *       - name: "Author"
 *     summary: "Obtiene lista de authors"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/authors", list);

/**
 * @swagger
 * /author/{slug}:
 *   get:
 *     tags:
 *       - name: "Author"
 *     summary: "Muestra la data de un Author"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Muestra data de un author activo"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/author/:slug", read);

/**
 * @swagger
 * /author/{slug}:
 *   put:
 *     tags:
 *       - name: "Author"
 *     summary: "Actualiza la data de un Author"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Actualiza data de un author activo"
 *         required: true
 *         type: "string"
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Author"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.put("/author/:slug", update);

/**
 * @swagger
 * /author/{slug}:
 *   patch:
 *     tags:
 *       - name: "Author"
 *     summary: "Elimina lógicamente un author"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Elimina un author activo"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.patch("/author/:slug", removeSoft);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *            type: string
 *         slug:
 *            type: string
 *            index: true
 *         status:
 *            type: string
 *            enum: ["Active", "Inactive"]
 *            default: "Active"
 *        
 *       example:
 *         name: Daniel Marinado
 *     
 */