import express from 'express'
import {Item} from '../models/item.model'

const router = express.Router()

//get all items
router.get('/items', async (req, res) => {
    Item.find().exec((err, data) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(data);
    });
})

//get item by id
router.get('/items/:id', async (req, res) => {
    const { id } = req.params
    Item.findById(id).exec((err, data) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(data);
    });
})

//add item
router.post('/items', (req, res) =>{
    const payload = req.body
    const item = new Item(payload)
    item.save()
    res.status(201).send(item);
})

//update item
router.put('/items/:id', (req, res) =>{
    const { id } = req.params
    const payload = req.body
    Item.findByIdAndUpdate(id, { $set: payload }).exec((err, data) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(data);
    });
})

export { router as itemRouter }