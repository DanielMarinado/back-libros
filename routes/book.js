const express = require("express");
const router = express.Router();
const { create, listAll, booksCount, removeSoft, read, update, list } = require("../controllers/book");
const { authCheck, adminCheck } = require("../middlewares/auth");
const { validateCreateBook, validateUpdateBook } = require("../validators/book");

/**
 * @swagger
 * /book:
 *   post:
 *     summary:  Crear libro
 *     tags:
 *       - name: "Book"
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Book"
 *     responses: 
 *       200: 
 *         description: ok
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Book"
 *       400:
 *         description: bad request
 */    
router.post("/book", authCheck, adminCheck, validateCreateBook, create);

/**
 * @swagger
 * /books/total:
 *   get:
 *     tags:
 *       - name: "Book"
 *     summary: "Devuelve la cantidad de libros activos registrados en el sistema"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/books/total", booksCount);  

/**
 * @swagger
 * /books/{count}:
 *   get:
 *     tags:
 *       - name: "Book"
 *     summary: "Devuelve data de libros activos registrados en el sistema"
 *     parameters:
 *       - name: "count"
 *         in: "path"
 *         description: "Devuelve libros activos"
 *         required: true
 *         type: "integer"
 *         format: "int64"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/books/:count", listAll);

/**
 * @swagger
 * /book/{slug}:
 *   patch:
 *     tags:
 *       - name: "Book"
 *     summary: "Elimina lógicamente un libro"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Elimina un libro activo"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.patch("/book/:slug", authCheck, adminCheck, removeSoft);

/**
 * @swagger
 * /book/{slug}:
 *   get:
 *     tags:
 *       - name: "Book"
 *     summary: "Muestra la data de un libro"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Muestra data de un libro activo"
 *         required: true
 *         type: "string"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/book/:slug", read);

/**
 * @swagger
 * /book/{slug}:
 *   put:
 *     tags:
 *       - name: "Book"
 *     summary: "Actualiza la data de un libro"
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Actualiza data de un libro activo"
 *         required: true
 *         type: "string"
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Book"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.put("/book/:slug", authCheck, adminCheck, validateUpdateBook, update);

/**
 * @swagger
 * /books:
 *   post:
 *     tags:
 *       - name: "Book"
 *     summary: "Obtiene lista de libros"
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Order"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.post("/books", list);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - price
 *         - isbn
 *         - edition
 *         - pages
 *         - editorial
 *         - author
 *         - country
 *         - category
 *       properties:
 *         title:
 *            type: string
 *            trim: true
 *            maxlength: 32
 *            text: true
 *         description:
 *            type: string
 *            maxlength: 2000
 *            text: true
 *         price:
 *            type: "integer"
 *            trim: true
 *            maxlength: 32
 *         isbn:
 *            type: string
 *            trim: true
 *            maxlength: 32
 *            text: true
 *         edition:
 *            type: string
 *            trim: true
 *            maxlength: 500
 *            text: true
 *         pages:
 *            type: "integer"
 *            trim: true
 *            maxlength: 3500
 *         editorial:
 *            type: string
 *            trim: true
 *            maxlength: 50
 *            minlength: 2
 *            text: true
 *         author:
 *            type: string
 *            trim: true
 *            maxlength: 50
 *            minlength: 2
 *            text: true
 *         country:
 *            type: string
 *            trim: true
 *            maxlength: 50
 *            minlength: 2
 *            text: true
 *         category:
 *            type: string
 *            trim: true
 *            maxlength: 50
 *            minlength: 2
 *            text: true
 *       example: 
 *         title: Rebelión en la granja
 *         description: Rebelión en la granja es una novela corta satírica del escritor británico George Orwell.
 *         price: 300
 *         isbn: 123123123
 *         edition: Primera edición
 *         pages: 320
 *         editorial: Doubleday
 *         author: stephen-king
 *         country: chile
 *         category: ficcion
 * 
 *     Order:
 *       type: object
 *       required:
 *         - sort
 *         - order
 *         - page
 *       properties:
 *         sort:
 *            type: string
 *            trim: true
 *            maxlength: 32
 *            text: true
 *         order:
 *            type: string
 *            trim: true
 *            maxlength: 6
 *            text: true
 *         page:
 *            type: "integer"
 *       example: 
 *         sort: createdAt
 *         order: desc
 *         page: 1
 * 
 */