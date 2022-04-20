const mongoose = require("mongoose");

const editorialSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "Name is required"],
            minlength: [2, "Too short"],
            maxlength: [50, "Too long"],
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true
        },
        status: {
            type: String,
            default: "Active",
            enum: ["Active", "Inactive"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Editorial", editorialSchema);