const express = require('express')
const fileUpload = require("express-fileupload")
const tempy = require('tempy')
const { exec } = require('child_process')
const app = express()

app.use(fileUpload())

app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.')

  const dataFile = req.files.dataFile
  tmpFile = tempy.file()

  dataFile.mv(tmpFile, function(err) {
    if (err)
      return res.status(500).send(err)
    res.send()
  })

  exec(`xclip -selection clipboard -i ${tmpFile} -t ${dataFile.mimetype}`, (err, stdout, stderr) => {
    if (err) {
      console.log(err)
      return
    }
  })
})

app.listen(8001, () => console.log(`Server is running on port 8001..`))