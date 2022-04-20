const Country = require("../models/country");
const slugify = require("slugify");
const { GET_ASYNC, SET_ASYNC } = require("../redis/index");
const { request } = require("express");

exports.create = async ( req, res ) => {
    try {
        const { name } = req.body;
        const country = await new Country({ name, slug: slugify(name) }).save();
        res.json( country );
    }catch(err){
        console.log(err);
        res.status(400).send("Create Country failed");
    }
}

exports.list = async (req, res) => {
    res.json(
        await Country.find({ status: "Active" }).sort({ createdAt: "asc" }).exec()
    )
}

exports.read = async( req, res ) => {
    let country = await Country.findOne({
        slug: req.params.slug,
        status: "Active"
    }).exec();

    res.json({
        country
    });
}

exports.update = async( req, res ) => {
    const { name } = req.body;
    try {
        const updated = await Country.findOneAndUpdate(
            { slug: req.params.slug}, 
            { name: name, slug: slugify(name) },
            { new: true }
        );
        res.json( updated );
    } catch (err) {
        console.log(err);
        res.status(400).send(`Country ${req.params.slug} failed update`);
    }
}

exports.remove = async( req, res ) => {
    try {
        const deleted = await Country.findOneAndDelete( { slug: req.params.slug} );
        res.json( deleted );
    } catch (err) {
        console.log(err);
        res.status(400).send(`Country ${req.params.slug} failed delete`);
    }
}

exports.removeSoft = async( req, res ) => {
    try {
        const deleted = await Country.findOneAndUpdate(
            { slug: req.params.slug}, 
            { status: "Inactive" },
            { new: true } 
        );
        res.json( deleted );
    } catch (err) {
        console.log(err);
        res.status(400).send(`Country ${req.params.slug} failed patch deleteSoft`);
    }
}