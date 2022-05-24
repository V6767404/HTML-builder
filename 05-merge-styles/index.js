const fs = require("fs");
const path = require("path");

let pathStyles = path.join(__dirname, "styles");
let pathBundle = path.join(__dirname, "project-dist", "bundle.css");
let bundle = fs.createWriteStream(pathBundle);

fs.readdir(pathStyles, { withFileTypes: true }, (err, files) => {
  files.forEach((file) => {
    if (file.isFile() && path.extname(file.name) == ".css") {
      let stream = fs.createReadStream(path.join(pathStyles, file.name),"utf-8");
      let data = "";
      stream.on("data", (chunk) => bundle.write((data += chunk)));
    }
  });
});