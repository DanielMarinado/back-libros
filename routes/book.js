const express = require("express");
const router = express.Router();
const { create, listAll, booksCount, removeSoft, read, update, list } = require("../controllers/book");
const { authCheck, adminCheck } = require("../middlewares/auth");


router.post("/book", authCheck, adminCheck, create);

/**
 * @swagger
 * /books/total:
 *   get:
 *     tags:
 *       - name: "Book"
 *     summary: "All books Active"
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
 *     summary: "All books active by count"
 *     parameters:
 *       - name: "count"
 *         in: "path"
 *         description: "count book search"
 *         required: true
 *         type: "integer"
 *         format: "int64"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/books/:count", listAll);

router.patch("/book/:slug", authCheck, adminCheck, removeSoft);
router.get("/book/:slug", read);
router.put("/book/:slug", authCheck, adminCheck, update);
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
 */