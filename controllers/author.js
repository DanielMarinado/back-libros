const Author = require("../models/author");
const slugify = require("slugify");
// const { GET_ASYNC, SET_ASYNC } = require("../redis/index");
const { request } = require("express");

exports.create = async ( req, res ) => {
    try {
        const { name } = req.body;
        const author = await new Author({ name, slug: slugify(name) }).save();
        res.json( author );
    }catch(err){
        console.log(err);
        res.status(400).send("Create Author failed");
    }
}

exports.list = async (req, res) => {
    res.json(
        await Author.find({ status: "Active" }).sort({ createdAt: "asc" }).exec()
    )
}

exports.read = async( req, res ) => {
    let author = await Author.findOne({
        slug: req.params.slug,
        status: "Active"
    }).exec();

    res.json({
        author
    });
}

exports.update = async( req, res ) => {
    const { name } = req.body;
    try {
        const updated = await Author.findOneAndUpdate(
            { slug: req.params.slug}, 
            { name: name, slug: slugify(name) },
            { new: true }
        );
        res.json( updated );
    } catch (err) {
        console.log(err);
        res.status(400).send(`Author ${req.params.slug} failed update`);
    }
}

exports.remove = async( req, res ) => {
    try {
        const deleted = await Author.findOneAndDelete( { slug: req.params.slug} );
        res.json( deleted );
    } catch (err) {
        console.log(err);
        res.status(400).send(`Author ${req.params.slug} failed delete`);
    }
}

exports.removeSoft = async( req, res ) => {
    try {
        const deleted = await Author.findOneAndUpdate(
            { slug: req.params.slug}, 
            { status: "Inactive" },
            { new: true } 
        );
        res.json( deleted );
    } catch (err) {
        console.log(err);
        res.status(400).send(`Author ${req.params.slug} failed patch deleteSoft`);
    }
}