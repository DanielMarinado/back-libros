const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: {
            type: String,
            required: true,
            index: true,  // puntero a la BD. proceso interno para mayor rapidez en busqueda del campo (email en este caso)
        },
        role: {
            type: String,
            default: "subscriber"
        },
        cart: {
            type: Array,
            default: [],
        },
        address: String,
        wishlist: [{ type: ObjectId, ref: "Book" }], 
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);