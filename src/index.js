const path = require("path");
const fs = require("fs");
const PDFMerge = require("pdf-merge");
const ShortUniqueId = require("short-unique-id");

const uid = new ShortUniqueId(5);

let pdfFiles = [];

const filesPath = process.cwd();

export async function readFiles() {
  fs.readdir(filesPath, onRead);
}

async function onRead(err, files) {
  if (err) {
    return console.log("Unable to scan directory: " + err);
    process.exit(1);
  }

  files.forEach(file => {
    pdfFiles.push(path.join(filesPath, file));
  });

  const fileUID = uid.randomUUID(5);

  try {
    await PDFMerge(pdfFiles, { output: `${filesPath}/output-${fileUID}.pdf` });
    console.log(`Output created! ${path.join(filesPath, "output-" + fileUID + ".pdf")}`);
  } catch (err) {
    return console.log("Error: " + err);
    process.exit(1);
  }
}
