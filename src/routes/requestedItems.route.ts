import express from 'express'
import { RequestedItemStatusEnum } from '../constants';
import RequestedItem, { RequestedItemDocument } from '../models/requestedItem.model'

const router = express.Router()

//get all items
router.get('/requested_items', async (req, res) => {
    try {
        const allItems: RequestedItemDocument[] | null = await RequestedItem.find({ status: { $ne: RequestedItemStatusEnum.closed }}).populate({
            path: 'borrower',
            select: 'location',
            populate: {
                path: 'location',
                model: 'Location'
            }
        }).exec();
        res.status(200).send(allItems);
    } catch (err) {
        res.status(400).send(err);
    }
})

//get all items by borrower id
router.get('/requested_items/borrower/:id', async (req, res) => {
    try {
        const { id } = req.params
        const allItems: RequestedItemDocument[] | null = await RequestedItem.find({ borrower: id}).exec();
        res.status(200).send(allItems);
    } catch (err) {
        res.status(400).send(err);
    }
})

//get item by id
router.get('/requested_items/:id', async (req, res) => {
    try {
        const { id } = req.params
        const item: RequestedItemDocument | null = await RequestedItem.findById(id).populate({
            path: 'borrower',
            select: ['name','location'],
            populate: {
                path: 'location',
                model: 'Location'
            }
        }).exec();
        res.status(200).send(item);
    } catch (err) {
        res.status(400).send(err);
    }
})

//add item
router.post('/requested_items', async (req, res) => {
    try {
        const payload = req.body
        const item = new RequestedItem(payload)
        await item.save()
        res.status(201).send(item);
    } catch (err) {
        res.status(400).send(err);
    }
})

// update item
router.put('/requested_items/:id', async (req, res) => {
    try {
        const { id } = req.params
        const payload = req.body
        const updatedItem: RequestedItemDocument | null = await RequestedItem.findByIdAndUpdate(id, { $set: payload }).exec();
        res.status(200).send(updatedItem);
    } catch (err) {
        res.status(400).send(err);
    }
})

//delete item
// router.delete('/items/:id', async (req, res) => {
//     try {
//         const { id } = req.params
//         await  Item.deleteOne({ _id: id }).exec();
//         res.status(200).send('Item deletion succeeded');
//     } catch (err) {
//         res.status(400).send(err);
//     }
// })
export { router as requestedItemRouter }
