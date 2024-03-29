const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");

const imageFolder = "./images/train/jpg/";
const outputFolder = "./images/train/img/";
const xmlFolder = "./images/train/xml/";

fs.readdir(xmlFolder, (err, files) => {
  // On error, show it and return
  err ? console.log("forEach: ", err) : null;

  files.forEach((file) => {
    fs.readFile(xmlFolder + file, (err, data) => {
      xml2js
        .parseStringPromise(data)
        .then((result) => {
          let imgName = result.annotation.filename[0];
          fs.copyFile(imageFolder + imgName, outputFolder + imgName, (err) => {
            if (err) {
              console.log("Error Found:", err);
            }
          });
        })
        .catch((err) => console.error(err));
    });
  });
});
