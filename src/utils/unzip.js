const extract = require("extract-zip");

async function unzip(source, target) {
  try {
    await extract(source, { dir: target });
    console.log("Extraction complete");
  } catch (err) {
    // handle any errors
    throw err;
  }
}

module.exports = unzip;
