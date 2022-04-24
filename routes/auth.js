const express = require("express");
const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");
const { createOrUpdateUser, currentUser } = require("../controllers/auth");


/**
 * @swagger
 * schemes:
 *   - "https"
 *   - "http"
 * /create-or-update-user:
 *  post:
 *     summary: Create or Update User with Firebase Auth
 *     tags:
 *         - Auth
 *     consumes:
 *         - "application/json"
 *     produces:
 *         - "application/json"
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT-ouath2
 *     responses:
 *      "200":
 *         description: User Information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *      "401":
 *         description: Invalid or expired token
*/    
router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         name:
 *            type: string
 *         email:
 *            type: string
 *            index: true
 *         role:
 *            type: string
 *            default: "subscriber"
 *         cart:
 *            type: Array
 *            default: []
 *         address:
 *            type: String
 *         wishlist:
 *              $ref: "#/components/schemas/Book"
 *       example:
 *         name: dmarinado
 *         email: dmarinado@daniel.marinado
 *         role: subscriber
 *         cart: []
 *         address: Mi casa 1234, Concepción
 *         wishlist: []      
 */