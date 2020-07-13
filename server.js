const express = require("express");
const basicAuth = require("express-basic-auth");
const fileUpload = require("express-fileupload");
const tempy = require("tempy");
const { exec } = require("child_process");
const app = express();

app.use(fileUpload());

const password = process.argv[2];

if (!password) {
  console.warn('You must specify a password used for basic auth. For example node server.js your-password-here');
  process.exit();
}

app.use(
  basicAuth({
    users: { ios: password },
    unauthorizedResponse: getUnauthorizedResponse
  })
);

app.post("/upload", function(req, res) {
  if (!req.files) return res.status(400).send("No files were uploaded.");

  const dataFile = req.files.dataFile;
  tmpFile = tempy.file();

  dataFile.mv(tmpFile, function(err) {
    if (err) return res.status(500).send(err);
    res.send();
  });

  exec(
    `xclip -selection clipboard -i ${tmpFile} -t ${dataFile.mimetype}`,
    (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        return;
      }
    }
  );
});

app.get("/get-clipboard", (req, res) => {
  exec(`xclip -selection clipboard -o -t TARGETS`, (err, stdout, stderr) => {
    const imageTarget = /image\/.*/g.exec(stdout);
    if (imageTarget) {
      imageContentType = imageTarget[0];
      tmpFile = tempy.file();
      exec(
        `xclip -selection clipboard -t ${imageContentType} -o > ${tmpFile}`,
        (err, stdout, stderr) => {
          res.contentType(imageContentType);
          res.sendFile(tmpFile);
        }
      );
    } else {
      exec(`xclip -selection clipboard -o -t TEXT`, (err, stdout, stderr) => {
        res.send(stdout);
      });
    }
  });
});

function getUnauthorizedResponse(req) {
  return req.auth
    ? "Credentials " + req.auth.user + ":" + req.auth.password + " rejected"
    : "No credentials provided";
}

app.listen(8001, () => console.log(`Server is running on port 8001...`));
