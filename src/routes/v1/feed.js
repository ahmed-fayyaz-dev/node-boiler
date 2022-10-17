const express = require("express");
const router = express.Router();
const logger = require("../../middleware/logger");
const { sftp, downloadFile } = require("../../services/sftp.service");

router.use(logger);

router.get("/", (req, res) => {
  res.send("Feed List");
});

router.get("/download", async (req, res) => {
  downloadFile();

  res.send("Feed Download new");
});

router
  .route("/upload")
  .post((req, res) => {
    res.send("Uploading New Feed");
  })
  .put((req, res) => {
    const file = req.body.file;
    res.send(`Update Feed With new file`);
  });

// ":" to create a params
// "router.route()" to chain types/get/post/etc with same route

// Middleware
router.param("id", (req, res, next, value) => {
  // req.x "x" is inserting new variable

  next();
});

module.exports = router;
