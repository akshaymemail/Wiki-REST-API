// requiring the npm packages
const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//creating express app
const app = express()

// setting ejs engine
app.set('view engine', 'ejs')

// let app use body-parser
app.use(bodyParser.urlencoded({
    extended: true
}))

// setting up static files
app.use(express.static("public"))

// connecting to the database
mongoose.connect('mongodb://localhost:27017/wikiDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// creating schema
const schema = {
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}

// creating collection in the connected database
const Article = mongoose.model('Article', schema)

// listening the home route
app.get('/', function (req, res) {
    res.render('home')
})

////////////////////////////////////// Request targeting all articles ///////////////////////

// changing the routes
app.route('/articles')

    // listening the articles route
    .get(function (req, res) {
        // fetching all articles from the database
        Article.find({}, function (err, foundArticles) {
            // checking the err
            if (!err) {
                // send the data to the client
                res.send(foundArticles)
            } else {
                // someting is not right, print the err
                console.log(err)
            }
        })
    })

    // posting the articles by the client to the database
    .post(function (req, res) {
        // save the article to the database
        new Article({
            title: req.body.title,
            content: req.body.content
        }).save(function (err) {
            // checking the err
            if (!err) {
                // article added successfully
                res.send("Article was added successfully!")
            } else {
                // there was an error
                res.send(err)
            }
        })
    })

    // deleting all the articles from the database
    .delete(function (req, res) {
        // delete the articles from the Article collection
        Article.deleteMany({}, function (err) {
            if (!err) {
                // articles deleted successfully
                res.send('All articles are deleted successfully!')
            } else {
                // there was an error
                res.send(err)
            }
        })
    });

///////////////////////////////// Request targeting a specific article ///////////////////////

// changing the routes
app.route('/articles/:articleTitle')

    // listening the get route
    .get(function (req, res) {
        // fetching a specific requested article
        Article.findOne({
            title: req.params.articleTitle
        }, function (err, foundArticle) {
            if (foundArticle) {
                // article found successfully
                res.send(foundArticle)
            } else {
                // there was an error or the article was not found
                res.send(err)
            }
        })
    })
    // listening the put route to update the specific article
    .put(function (req, res) {
        // updating the specified article
        Article.update({
            title: req.params.articleTitle
        }, {
            title: req.body.title,
            content: req.body.content
        }, {
            overwrite: true
        }, function (err) {
            // checking the error
            if (!err) {
                // article updated successfully
                res.send("Article updated successfully")
            } else {
                // there was an error
                res.send(err)
            }
        })
    })

    // listening the patch route to update the part of the article
    .patch(function (req, res) {
        // updating the specified field of the article
        Article.update({
                title: req.params.articleTitle
            }, {
                $set: req.body
            },
            function (err) {
                // checking the error
                if (!err) {
                    // article updated successfully
                    res.send("Article updated successfully")
                } else {
                    res.send(err)
                }
            })
    })

    // listening delete route to delete the article
    .delete(function (req, res) {
        // deleting the specified article form the collection
        Article.deleteOne(
            {title : req.params.articleTitle},
            function (err) {
                // checking the error
                if (!err) {
                    // article deleted successfully
                    res.send("Article deleted successfully")
                }else {
                    //there was an error
                    res.send(err)
                }
            }
        )
    })

// spinning the server at port 3000
app.listen(3000 || process.env.PORT, function () {
    console.log('listening on port 3000')
})