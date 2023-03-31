import express from 'express'
import { Location } from '../models/location.model'

const router = express.Router()

//get all locations
router.get('/locations', async (req, res) => {
    try {
        Location.find().exec((err, data) => {
            if (err) return res.status(400).send(err);
            res.status(200).send(data);
        });
    } catch (err) {
        res.status(400).send(err);
    }
})

//get location by id
router.get('/locations/:id', async (req, res) => {
    try {
        const { id } = req.params

        Location.findById(id).exec((err, data) => {
            if (err) return res.status(400).send(err);
            res.status(200).send(data);
        });
    } catch (err) {
        res.status(400).send(err);
    }
})

//add location
router.post('/locations', (req, res) => {
    try {
        const payload = req.body
        const location = new Location(payload)
        location.save()
        res.status(201).send(location);
    } catch (err) {
        res.status(400).send(err);
    }
})

//update location
router.put('/locations/:id', (req, res) => {
    try {
        const { id } = req.params
        const payload = req.body
        Location.findByIdAndUpdate(id, { $set: payload }).exec((err, data) => {
            if (err) return res.status(400).send(err);
            res.status(200).send(data);
        });
    } catch (err) {
        res.status(400).send(err);
    }
})

//delete location
router.delete('/locations/:id', (req, res) => {
    try {
        const { id } = req.params
        Location.deleteOne({ _id: id }).exec((err, data) => {
            if (err) return res.status(400).send(err);
            res.status(200).send(data);
        });
    } catch (err) {
        res.status(400).send(err);
    }
})
export { router as locationRouter }