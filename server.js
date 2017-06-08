"use strict";
//Requiere
const
    express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    port = process.env.PORT || 3000;

//Utilisation de app, c'est a dire d'express
app
    .all('*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
    .use(express.static('public'))
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json());

//On se connect à mongodb
mongoose.connect('mongodb://localhost/todo');
//Nouveau schema
const
    TodoSchema = mongoose.Schema({
        title: String

    }),
    Todo = mongoose.model('Todo', TodoSchema),
    routed = express.Router();


//API routed
routed
    .route('/')
    .get(function (req, res) {
        Todo.find(function (err, todo) {
            if (err) {
                res.send(err);
            }
            res.json({todo});
        });
    })
    .post(function (req, res) {
        var todo = new Todo();
        todo.title = req.body.title

        todo.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.send({ message: 'todo created' });
        })
    });

routed
    .route('/:todo_id')
    .get(function (req, res) {
        Todo.findOne({ _id: req.params.todo_id }, function (err, todo) {
            if (err) {
                res.send(err);
            }
            res.json({ todo });
        });
    })
    .put(function (req, res) {
        Todo.findOne({ _id: req.params.todo_id }, function (err, todo) {
            if (err) {
                res.send(err);
            }
            todo.title = req.body.title,
            todo.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.send({ message: 'todo update' });
            });
        });
    })
    .delete(function (req, res) {
        Todo.remove({ _id: req.params.todo_id }, function (err) {
            if (err) {
                res.send(err);
            }
            res.send({ message: 'todo deleted' });
        });
    });
app.use("/Todo", routed);

app.listen(port, function () {
    console.log("Adresse du serveur : http://localhost:" + port);
});


