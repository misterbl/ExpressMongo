import express from "express";
import Book from "../models/bookModel";
const bookRouter = express.Router();

bookRouter
  .route("/")
  .get((req, res) => {
    Book.find({}, (err, books) => {
      res.json(books);
    });
  })
  .post((req, res) => {
    console.log(req);
    let book = new Book(req.body.body);
    book.save();
    console.log("book", book);
    res.status(201).send(book);
  });

bookRouter.use("/:bookId", (req, res, next) => {
  Book.findById(req.params.bookId, (err, book) => {
    if (err) res.status(500).send(err);
    else {
      req.book = book;
      next();
    }
  });
});
bookRouter
  .route("/:bookId")
  .get((req, res) => {
    res.json(req.book);
  })

  .put((req, res) => {
    req.book.title = req.body.title;
    req.book.author = req.body.author;
    req.book.save();
    res.json(req.book);
  })
  .patch((req, res) => {
    if (req.body._id) {
      delete req.body._id;
    }
    for (let b in req.body) {
      req.book[b] = req.body[b];
    }
    req.book.save();
    res.json(req.book);
  })
  .delete((req, res) => {
    req.book.remove(err => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(204).send("removed");
      }
    });
  });
export default bookRouter;
