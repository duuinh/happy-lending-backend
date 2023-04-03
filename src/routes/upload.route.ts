import { Storage } from "@google-cloud/storage";
import dotenv from "dotenv";
import express from "express";

const router = express.Router();

const FileController = require("../utility/googleCloudUpload");
const fileController = new FileController();

// initialize configuration
dotenv.config();

const { format } = require("util");

const storage = new Storage({ keyFilename: "google-cloud-key.json" });
const googleCloudBucket = process.env.GOOGLE_CLOUD_BUCKET || "UNKNOWN";
const bucket = storage.bucket(googleCloudBucket);

const util = require("util");
const Multer = require("multer");
const maxSize = 2 * 1024 * 1024;

let processFile = Multer({
  storage: Multer.memoryStorage(),
  limits: { fileSize: maxSize },
}).single("file");

let processFileAsync = util.promisify(processFile);

/*
// get all files from Google Cloud Bucket
router.get("/files", async (req, res) => {
  try {
    const [files] = await bucket.getFiles();
    let fileInfos: any = [];
    files.forEach((file) => {
      fileInfos.push({
        name: file.name,
        url: file.metadata.mediaLink,
      });
    });

    res.status(200).send(fileInfos);
  } catch (err) {
    console.log(err);

    res.status(500).send({
      message: "Unable to read list of files!",
    });
  }
});

//get file by name
router.get("/files/:name", async (req, res) => {
  try {
    const [metaData] = await bucket.file(req.params.name).getMetadata();
    res.redirect(metaData.mediaLink);
  } catch (err) {
    res.status(500).send({
      message: "Could not download the file. " + err,
    });
  }
});

// upload file
router.post("/upload", async (req, res) => {
  try {
    await processFileAsync(req, res);

    if (!req.file) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    const blob = bucket.file("items/" + req.file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on("error", (err) => {
      res.status(500).send({ message: err.message });
    });

    blobStream.on("finish", async (data: any) => {
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );

      try {
        await bucket.file(req.file!.originalname)?.makePublic();
      } catch {
        return res.status(500).send({
          message: `Uploaded the file successfully: ${
            req.file!.originalname
          }, but public access is denied!`,
          url: publicUrl,
        });
      }

      res.status(200).send({
        message: "Uploaded the file successfully: " + req.file!.originalname,
        url: publicUrl,
      });
    });

    blobStream.end(req.file.buffer);
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file!.originalname}. ${err}`,
    });
  }
});
*/

// upload file
router.post("/upload", async (req, res) => {
  await fileController.upload(req, res);
});

export { router as fileUploadRouter };
