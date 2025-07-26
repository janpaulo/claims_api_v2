const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();
const remoteFileURL = process.env.FILE_SERVER_HOST;

// Check if it's a local path (starts with C:\ or /)
const isLocalPath = remoteFileURL.startsWith("C:\\") || remoteFileURL.startsWith("/");

router.get("/list", async (req, res) => {
  try {
    const fileList = [];

    if (isLocalPath) {
      // LOCAL FILE SYSTEM
      const files = fs.readdirSync(remoteFileURL);
      files.forEach((file) => {
        if (file.endsWith(".enc")) {
          fileList.push({
            name: file,
            path: path.join(remoteFileURL, file),
          });
        }
      });
    } else {
      // REMOTE FILE SERVER via HTTP
      const response = await axios.get(remoteFileURL);
      const $ = cheerio.load(response.data);

      $("a").each((_, el) => {
        const name = $(el).attr("href");
        if (!name || name === "../" || !name.endsWith(".enc")) return;
        fileList.push({
          name,
          url: remoteFileURL + name,
        });
      });
    }

    res.json(fileList);
  } catch (error) {
    console.error("Error fetching file list:", error.message);
    res.status(500).json({ error: "Failed to fetch file list" });
  }
});

module.exports = router;
