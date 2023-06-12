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
            const data = await fsPromises.readdir("../../server/upload")
            console.log(data)
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
                    await fsPromises.access(`../../server/upload/${newName}.jpg`);
                    newName += "-copy"
                } catch (error) {
                    isExisting = false
                }
            }

            await fsPromises.rename(`../../server/upload/${req.body.name}`, `../../server/upload/${newName}.jpg`)
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
            await fsPromises.unlink(`../../server/upload/${req.body.name}`)
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
            await fsPromises.unlink(`../../server/upload/${n}`)
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

app.get("/filename/:name", function(req, res) {
    let name = req.params.name
    console.log(name.substring(1))
    const filePath = path.resolve(__dirname, `../../server/upload/${name.substring(1)}`);
    console.log(filePath)
    res.sendFile(filePath)
})

/* --- */

app.listen(PORT, function() {
    console.log("start serwera na porcie " + PORT)
})