const Category = require("../models/category");
const slugify = require("slugify");
const { GET_ASYNC, SET_ASYNC } = require("../redis/index");
const { request } = require("express");

exports.create = async ( req, res ) => {
    try {
        const { name } = req.body;
        const category = await new Category({ name, slug: slugify(name) }).save();
        res.json( category );
    }catch(err){
        console.log(err);
        res.status(400).send("Create Category failed");
    }
}

exports.list = async (req, res) => {
    res.json(
        await Category.find({ status: "Active" }).sort({ createdAt: "asc" }).exec()
    )
}

exports.read = async( req, res ) => {
    let category = await Category.findOne({
        slug: req.params.slug,
        status: "Active"
    }).exec();

    res.json({
        category
    });
}

exports.update = async( req, res ) => {
    const { name } = req.body;
    try {
        const updated = await Category.findOneAndUpdate(
            { slug: req.params.slug}, 
            { name: name, slug: slugify(name) },
            { new: true }
        );
        res.json( updated );
    } catch (err) {
        console.log(err);
        res.status(400).send(`Category ${req.params.slug} failed update`);
    }
}

exports.remove = async( req, res ) => {
    try {
        const deleted = await Category.findOneAndDelete( { slug: req.params.slug} );
        res.json( deleted );
    } catch (err) {
        console.log(err);
        res.status(400).send(`Category ${req.params.slug} failed delete`);
    }
}

exports.removeSoft = async( req, res ) => {
    try {
        const deleted = await Category.findOneAndUpdate(
            { slug: req.params.slug}, 
            { status: "Inactive" },
            { new: true } 
        );
        res.json( deleted );
    } catch (err) {
        console.log(err);
        res.status(400).send(`Category ${req.params.slug} failed patch deleteSoft`);
    }
}