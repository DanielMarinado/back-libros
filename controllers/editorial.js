const Editorial = require("../models/editorial");
const slugify = require("slugify");
// const { GET_ASYNC, SET_ASYNC } = require("../redis/index");
const { request } = require("express");

exports.create = async ( req, res ) => {
    try {
        const { name } = req.body;
        const editorial = await new Editorial({ name, slug: slugify(name) }).save();
        res.json( editorial );
    }catch(err){
        console.log(err);
        res.status(400).send("Create Editorial failed");
    }
}

exports.list = async (req, res) => {
    res.json(
        await Editorial.find({ status: "Active" }).sort({ createdAt: "asc" }).exec()
    )
}

exports.read = async( req, res ) => {
    let editorial = await Editorial.findOne({
        slug: req.params.slug,
        status: "Active"
    }).exec();

    res.json({
        editorial
    });
}

exports.update = async( req, res ) => {
    const { name } = req.body;
    try {
        const updated = await Editorial.findOneAndUpdate(
            { slug: req.params.slug}, 
            { name: name, slug: slugify(name) },
            { new: true }
        );
        res.json( updated );
    } catch (err) {
        console.log(err);
        res.status(400).send(`Editorial ${req.params.slug} failed update`);
    }
}

exports.remove = async( req, res ) => {
    try {
        const deleted = await Editorial.findOneAndDelete( { slug: req.params.slug} );
        res.json( deleted );
    } catch (err) {
        console.log(err);
        res.status(400).send(`Editorial ${req.params.slug} failed delete`);
    }
}

exports.removeSoft = async( req, res ) => {
    try {
        const deleted = await Editorial.findOneAndUpdate(
            { slug: req.params.slug}, 
            { status: "Inactive" },
            { new: true } 
        );
        res.json( deleted );
    } catch (err) {
        console.log(err);
        res.status(400).send(`Editorial ${req.params.slug} failed patch deleteSoft`);
    }
}