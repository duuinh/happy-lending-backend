import express from 'express'
import {Location} from '../models/location.model'

const router = express.Router()

//get all locations
router.get('/locations', async (req, res) => {
    Location.find().exec((err, data) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(data);
    });
})

//get location by id
router.get('/locations/:id', async (req, res) => {
    const { id } = req.params
    Location.findById(id).exec((err, data) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(data);
    });
})

//add location
router.post('/locations', (req, res) =>{
    const payload = req.body
    const location = new Location(payload)
    location.save()
    res.status(201).send(location);
})

//update item
router.put('/locations/:id', (req, res) =>{
    const { id } = req.params
    const payload = req.body
    Location.findByIdAndUpdate(id, { $set: payload }).exec((err, data) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(data);
    });
})

export { router as locationRouter }