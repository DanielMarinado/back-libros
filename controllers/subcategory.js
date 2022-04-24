const Subcategory = require("../models/subcategory");
const slugify = require("slugify");
// const { GET_ASYNC, SET_ASYNC } = require("../redis/index");
const { request } = require("express");

exports.create = async ( req, res ) => {
    try {
        const { name, parent } = req.body;
        const subcategory = await new Subcategory({ name, slug: slugify(name), parent }).save();
        res.json( subcategory );
    }catch(err){
        console.log(err);
        res.status(400).send("Create SubCategory failed");
    }
}

exports.list = async (req, res) => {
    res.json(
        await Subcategory.find({ status: "Active" }).sort({ createdAt: "asc" }).exec()
    )
}

exports.read = async( req, res ) => {
    let subcategory = await Subcategory.findOne({
        slug: req.params.slug,
        status: "Active"
    }).exec();

    res.json({
        subcategory
    });
}

exports.update = async( req, res ) => {
    const { name } = req.body;
    try {
        const updated = await Subcategory.findOneAndUpdate(
            { slug: req.params.slug}, 
            { name: name, slug: slugify(name) },
            { new: true }
        );
        res.json( updated );
    } catch (err) {
        console.log(err);
        res.status(400).send(`SubCategory ${req.params.slug} failed update`);
    }
}

exports.remove = async( req, res ) => {
    try {
        const deleted = await Subcategory.findOneAndDelete( { slug: req.params.slug} );
        res.json( deleted );
    } catch (err) {
        console.log(err);
        res.status(400).send(`SubCategory ${req.params.slug} failed delete`);
    }
}

exports.removeSoft = async( req, res ) => {
    try {
        const deleted = await Subcategory.findOneAndUpdate(
            { slug: req.params.slug}, 
            { status: "Inactive" },
            { new: true } 
        );
        res.json( deleted );
    } catch (err) {
        console.log(err);
        res.status(400).send(`SubCategory ${req.params.slug} failed patch deleteSoft`);
    }
}