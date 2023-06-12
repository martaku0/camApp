const express = require("express")
const app = express()
const PORT = 3000;
// app.use(express.static('static'))
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));
const fsPromises = require("fs").promises
const path = require("path")

const cors = require('cors')
app.use(cors())
app.use(express.json());

app.get("/", function(req, res) {
    res.send("server working")
})

app.get("/getData", function(req, res) {
    res.header("content-type", "application/json")

    const list = async() => {
        try {
            const data = await fsPromises.readdir("../web-app/public/images")
            res.send(data)
        } catch (error) {
            res.send(error)
        }
    }

    list()
})

app.patch("/renameFile", function(req, res) {
    const rename = async() => {
        let newName = req.body.newName
        try {
            let isExisting = true
            while (isExisting) {
                try {
                    await fsPromises.access(`../web-app/public/images/${newName}.jpg`);
                    newName += "-copy"
                } catch (error) {
                    isExisting = false
                }
            }

            await fsPromises.rename(`../web-app/public/images/${req.body.name}`, `../web-app/public/images/${newName}.jpg`)
            console.log("renamed")

        } catch (error) {
            console.log(error);
        }
    }
    rename()

    res.send("rename")
})

app.patch("/deleteFile", function(req, res) {
    const deleteF = async() => {
        try {
            await fsPromises.unlink(`../web-app/public/images/${req.body.name}`)
            console.log("deleted")

        } catch (error) {
            console.log(error);
        }
    }
    deleteF()
    res.send("delete")
})

app.patch("/deleteMulti", function(req, res) {
    const list = req.body.list
    const deleteF = async(n) => {
        try {
            await fsPromises.unlink(`../web-app/public/images/${n}`)
            console.log("deleted")

        } catch (error) {
            console.log(error);
        }
    }
    list.forEach(e => {
        deleteF(e)
    });
    res.send("delete")
})

/* --- */

app.listen(PORT, function() {
    console.log("start serwera na porcie " + PORT)
})