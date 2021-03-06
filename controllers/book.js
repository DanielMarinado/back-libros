const Book = require("../models/book");
const Editorial = require("../models/editorial");
const Author = require("../models/author");
const Country = require("../models/country");
const Category = require("../models/category");
const slugify = require("slugify");
// const { GET_ASYNC, SET_ASYNC } = require("../redis/index")


exports.create = async ( req, res ) => {
    try {
        // Obtenemos todas las dependencias
        const editorial = await Editorial.findOne({ slug: req.body.editorial ? slugify(req.body.editorial): "" });
        const author    = await Author.findOne({ slug: req.body.author ? slugify(req.body.author) : "" });
        const country   = await Country.findOne({ slug: req.body.country ? slugify(req.body.country) : "" });
        const category  = await Category.findOne({ slug: req.body.category ? slugify(req.body.category) : "" });

        if(editorial){
            req.body.slug = slugify(req.body.title+' '+req.body.editorial);
            req.body.editorial = editorial._id;
        }else{
            throw new Error(`No existe editorial ${req.body.editorial}`);
        }

        if(author){
            req.body.author = author._id;
        }else{
            throw new Error(`No existe el autor ${req.body.author}`);
        }

        if(country){
            req.body.country = country._id;
        }else{
            throw new Error(`No existe country ${req.body.country}`);
        }

        if(category){
            req.body.category = category._id;
        }else{
            throw new Error(`No existe category ${req.body.category}`);
        }

        const newBook = await new Book(req.body).save();

        res.json(newBook);
    } catch (error) {
        res.status(400).json(error.message)
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
                slug: req.params.slug ? slugify(req.params.slug) : "",
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

// exports.read = async ( req, res ) => {
//     // const book = await Book.findOne({ slug: req.params.slug, status: "Active" }).exec();
//     // res.json(book);
//     try {
//         const reply = await GET_ASYNC(req.params.slug);
//         if(reply){
//             console.log("Using cached data");
//             return res.send(JSON.parse(reply));
//         }

//         const book = await Book.findOne({
//             slug: req.params.slug,
//             status: "Active" })
//         .populate("category", "-slug")
//         .exec();

//         if (!book) {
//             return res.status(404).json({ msg: "The book do not exist." });
//         }

//         const saveResult = await SET_ASYNC(
//             req.params.slug,
//             JSON.stringify(book),
//             "EX",
//             30
//         );

//         console.log("saved data:", saveResult);
//         res.json(book);
//     } catch (err) {
//         res.send(err.message);
//     }
// }

exports.read = async ( req, res ) => {
    // const book = await Book.findOne({ slug: req.params.slug, status: "Active" }).exec();
    // res.json(book);
    try {

        const book = await Book.findOne({
            slug: req.params.slug ? slugify(req.params.slug) : "",
            status: "Active" })
        .populate("category", "-slug")
        .exec();

        if (!book) {
            return res.status(404).json({ msg: "El libro no existe o est?? inactivo." });
        }

        res.json(book);
    } catch (err) {
        res.send(err.message);
    }
}

exports.update = async ( req, res ) => {
    try {

        const bookAnterior = await Book.find({ slug: req.params.slug ? slugify(req.params.slug) : ""});

        const author    = await Author.findOne({ slug: req.body.author ? slugify(req.body.author) : ""});
        const country   = await Country.findOne({ slug: req.body.country ? slugify(req.body.country ) : "" });
        const category  = await Category.findOne({ slug: req.body.category ? slugify(req.body.category) : "" });

        if(req.body.title && req.body.editorial){
            const editorial = await Editorial.findOne({ name: req.body.editorial });
            if(editorial){
                req.body.editorial = editorial._id;
                req.body.slug = slugify(req.body.title+' '+editorial.name);
            }
            else
                throw new Error(`No existe editorial ${req.body.editorial}`);
        } else if(req.body.title){
            req.body.slug = slugify(req.body.title+' '+bookAnterior.editorial);
        } else{
            throw new Error(`No existe t??tulo del libro`);
        }

        if(author){
            req.body.author = author._id;
        }else{
            throw new Error(`No existe author ${req.body.author}`);
        }

        if(country){
            req.body.country = country._id;
        }else{
            throw new Error(`No existe country ${req.body.country}`);
        }

        if(category){
            req.body.category = category._id;
        }else{
            throw new Error(`No existe category ${req.body.category}`);
        }

        const updated = await Book.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true }
        ).exec();
        res.json(updated);
    } catch (error) {
        console.log("Book UPDATE ERR -->", error);
        res.status(400).json(error.message)
    }
}

//list with redis
// exports.list = async ( req, res ) => {
//     console.table(req.body);
//     try {
//         // createdAt/updatedAt, desc/asc, 3
//         const { sort, order, page } = req.body;
//         const currentPage = page | 1;
//         const perPage = 3;

//         // search data in redis
//         const reply = await GET_ASYNC(req.originalUrl);
//         // const reply = await GET_ASYNC("books");
//         if(reply){
//             console.log("Using cached data")
//             return res.send(JSON.parse(reply))
//         }

//         const books = await Book.find({ status: "Active" })
//             .skip((currentPage-1) * perPage)
//             .populate("category")
//             .sort([[ sort, order]])
//             .limit(perPage)
//             .exec();

//         if (!books) {
//             return res.status(404).json({ msg: "Not found books with status active." });
//         }

//         const saveResult = await SET_ASYNC(
//             req.originalUrl,
//             JSON.stringify(books),
//             "EX",
//             60
//         );

//         console.log("saved data:", saveResult);
//         res.json(books);
//     } catch (error) {
//         console.log(error)
//     }
// }

exports.list = async ( req, res ) => {
    console.table(req.body);
    try {
        // createdAt/updatedAt, desc/asc, 3
        const { sort, order, page } = req.body;
        const currentPage = page | 1;
        const perPage = 3;

        const books = await Book.find({ status: "Active" })
            .skip((currentPage-1) * perPage)
            .populate("category")
            .sort([[ sort, order]])
            .limit(perPage)
            .exec();

        if (!books) {
            return res.status(404).json({ msg: "Not found books with status active." });
        }

        
        res.json(books);
    } catch (error) {
        console.log(error)
    }
}