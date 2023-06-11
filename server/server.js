const express = require("express")
const app = express()
const PORT = 3000;
app.use(express.static('static'))
const path = require("path")
const formidable = require('formidable');
const bodyParser = require("body-parser")

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {
    res.setHeader("Content-type", "application/json")

    res.send("ok")
})

app.post("/", function (req, res) {
    let form = formidable({});

    form.uploadDir = path.join(__dirname, "upload")

    form.keepExtensions = true

    form.multiples = true

    form.on('fileBegin', (name, file) => {
        file.path = path.join(form.uploadDir, Date.now().toString() + path.extname(file.path))
    })

    form.parse(req, function (err, fields, files) {
        console.log('ok')
        res.send("plik przesłany!")
    });

})

/* --- */

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})