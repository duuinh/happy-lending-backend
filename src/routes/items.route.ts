import express from 'express'
import { Item } from '../models/item.model'

const router = express.Router()

//get all items
router.get('/items', async (req, res) => {

    try {
        Item.find().populate({
            path: 'lender',
            populate: {
                path: 'location',
                model: 'Location'
            }
        }).exec((err, data) => {
            if (err) return res.status(400).send(err);
            res.status(200).send(data);
        });
    } catch (err) {
        res.status(400).send(err);
    }
})

//get item by id
router.get('/items/:id', async (req, res) => {
    try {
        const { id } = req.params
        Item.findById(id).populate({
            path: 'lender',
            populate: {
                path: 'location',
                model: 'Location'
            }
        }).exec((err, data) => {
            if (err) return res.status(400).send(err);
            res.status(200).send(data);
        });
    } catch (err) {
        res.status(400).send(err);
    }
})

//add item
router.post('/items', (req, res) => {
    try {
        const payload = req.body
        const item = new Item(payload)
        item.save()
        res.status(201).send(item);
    } catch (err) {
        res.status(400).send(err);
    }

})

//update item
router.put('/items/:id', (req, res) => {
    try {
        const { id } = req.params
        const payload = req.body
        Item.findByIdAndUpdate(id, { $set: payload }).exec((err, data) => {
            if (err) return res.status(400).send(err);
            res.status(200).send(data);
        });
    } catch (err) {
        res.status(400).send(err);
    }

})

//delete item
router.delete('/items/:id', (req, res) => {
    try {
        const { id } = req.params
        Item.deleteOne({ _id: id }).exec((err, data) => {
            if (err) return res.status(400).send(err);
            res.status(200).send(data);
        });
    } catch (err) {
        res.status(400).send(err);
    }
})
export { router as itemRouter }