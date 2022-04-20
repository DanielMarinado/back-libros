const Book = require("../models/book");
const Editorial = require("../models/editorial");
const Author = require("../models/author");
const Country = require("../models/country");
const Category = require("../models/category");
const slugify = require("slugify");


exports.create = async ( req, res ) => {
    try {
        // Obtenemos todas las dependencias
        const editorial = await Editorial.findOne({ name: req.body.editorial });
        const author    = await Author.findOne({ name: req.body.author });
        const country   = await Country.findOne({ name: req.body.country });
        const category  = await Category.findOne({ name: req.body.category });

        if(editorial){
            req.body.slug = slugify(req.body.title+' '+req.body.editorial);
            req.body.editorial = editorial._id;
        }else{
            res.status(400).json(`No existe la editorial ${req.body.editorial}`);
        }

        if(author){
            req.body.author = author._id;
        }else{
            res.status(400).json(`No existe el author ${req.body.author}`);
        }

        if(country){
            req.body.country = country._id;
        }else{
            res.status(400).json(`No existe country ${req.body.country}`);
        }

        if(category){
            req.body.category = category._id;
        }else{
            res.status(400).json(`No existe category ${req.body.category}`);
        }

        const newBook = await new Book(req.body).save();

        res.json(newBook);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            err: error.message,
            code: err.code,
        })
    }
}

exports.listAll = async ( req, res ) => {
    let books = await Book.find({ status: "Active" })
        .limit(parseInt(req.params.count))
        .sort([["createdAt", "desc"]])
        .exec();
    res.json(books);
}

exports.booksCount = async ( req, res ) => {
    let total = await Book.find({ status: "Active" }).estimatedDocumentCount({}).exec();
    res.json(total);
}

exports.removeSoft = async (req, res) => {
    try {
        const deleted = await Book.findOneAndUpdate(
            {
                slug: req.params.slug,
            },
            {
                status: "Inactive",
            },
            { new: true }
        ).exec();
        res.json(deleted);
    } catch (error) {
        console.log(error);
        return res.status(400).send("Book has failed");
    }
}

exports.read = async ( req, res ) => {
    const book = await Book.findOne({ slug: req.params.slug, status: "Active" }).exec();
    res.json(book);
}

exports.update = async ( req, res ) => {
    try {

        const bookAnterior = await Book.find({ slug: req.params.slug});

        const author    = await Author.findOne({ name: req.body.author });
        const country   = await Country.findOne({ name: req.body.country });
        const category  = await Category.findOne({ name: req.body.category });

        if(req.body.title && req.body.editorial){
            const editorial = await Editorial.findOne({ name: req.body.editorial });
            if(editorial){
                req.body.editorial = editorial._id;
                req.body.slug = slugify(req.body.title+' '+req.body.editorial);
            }
            else
                res.status(400).json(`No existe la editorial ${req.body.editorial}`);
        } else if(req.body.title){
            req.body.slug = slugify(req.body.title+' '+bookAnterior.editorial);
        } else{
            res.status(400).json(`Debe ingresar un título de libro`);
        }

        if(author){
            req.body.author = author._id;
        }else{
            res.status(400).json(`No existe el author ${req.body.author}`);
        }

        if(country){
            req.body.country = country._id;
        }else{
            res.status(400).json(`No existe country ${req.body.country}`);
        }

        if(category){
            req.body.category = category._id;
        }else{
            res.status(400).json(`No existe category ${req.body.category}`);
        }

        const updated = await Book.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true }
        ).exec();
        res.json(updated);
    } catch (error) {
        console.log("Book UPDATE ERR -->", error);
        res.status(400).json({
            err: err.message,
        })
    }
}

exports.list = async ( req, res ) => {
    console.table(req.body);
    try {
        // createdAt/updatedAt, desc/asc, 3
        const { sort, order, page } = req.body;
        const currentPage = page | 1;
        const perPage = 3;

        const books = await Book.find({ status: "Active" })
            .skip((currentPage-1) * perPage)
            .sort([[ sort, order]])
            .limit(perPage)
            .exec();
        res.json(books);
    } catch (error) {
        console.log(error)
    }
}