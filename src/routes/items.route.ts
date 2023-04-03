import express from "express";
import { Item, ItemDocument } from "../models/item.model";
const multer = require("multer");
const upload = multer();

const router = express.Router();

const FileController = require("../utility/googleCloudUpload");
const fileController = new FileController();

//get all items
router.get("/items", async (req, res) => {
  try {
    const allItems: ItemDocument[] | null = await Item.find()
      .populate({
        path: "lender",
        populate: {
          path: "location",
          model: "Location",
        },
      })
      .exec();
    res.status(200).send(allItems);
  } catch (err) {
    res.status(400).send(err);
  }
});

//get all items by lender id
router.get("/items/lender/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allItems: ItemDocument[] | null = await Item.find({
      lender: id,
    }).exec();
    res.status(200).send(allItems);
  } catch (err) {
    res.status(400).send(err);
  }
});

//get item by id
router.get("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item: ItemDocument | null = await Item.findById(id)
      .populate({
        path: "lender",
        populate: {
          path: "location",
          model: "Location",
        },
      })
      .exec();
    res.status(200).send(item);
  } catch (err) {
    res.status(400).send(err);
  }
});

//add item
const { v4: uuidv4 } = require("uuid");
router.post("/items", upload.none(), async (req, res) => {
  try {
    const payload = req.body;
    console.log(payload);
    await fileController.upload(req, res);

    console.log(res);

    const item = new Item(payload);

    item.save();
    res.status(201).send(item);
    console.log(res);
  } catch (err) {
    res.status(400).send(err);
  }
});

//update item
router.put("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const updatedItem: ItemDocument | null = await Item.findByIdAndUpdate(id, {
      $set: payload,
    }).exec();
    res.status(200).send(updatedItem);
  } catch (err) {
    res.status(400).send(err);
  }
});

//delete item
router.delete("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Item.deleteOne({ _id: id }).exec();
    res.status(200).send("Item deletion succeeded");
  } catch (err) {
    res.status(400).send(err);
  }
});
export { router as itemRouter };
