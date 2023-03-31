import express from 'express'
import { Location, LocationDocument } from '../models/location.model'

const router = express.Router()

//get all locations
router.get('/locations', async (req, res) => {
    try {
        const allLocations: LocationDocument[] | null = await Location.find().exec();
        res.status(200).send(allLocations);
    } catch (err) {
        res.status(400).send(err);
    }
})

//get location by id
router.get('/locations/:id', async (req, res) => {
    try {
        const { id } = req.params
        const location: LocationDocument | null = await Location.findById(id).exec();
        res.status(200).send(location);
    } catch (err) {
        res.status(400).send(err);
    }
})

//add location
router.post('/locations', async (req, res) => {
    try {
        const payload = req.body
        const location = new Location(payload)
        await location.save()
        res.status(201).send(location);
    } catch (err) {
        res.status(400).send(err);
    }
})

//update location
router.put('/locations/:id', async (req, res) => {
    try {
        const { id } = req.params
        const payload = req.body
        const updatedLocation: LocationDocument | null = await Location.findByIdAndUpdate(id, { $set: payload }).exec();
        res.status(200).send(updatedLocation);
    } catch (err) {
        res.status(400).send(err);
    }
})

//delete location
router.delete('/locations/:id', async (req, res) => {
    try {
        const { id } = req.params
        await Location.deleteOne({ _id: id }).exec();
        res.status(200).send('Location deletion succeeded');
    } catch (err) {
        res.status(400).send(err);
    }
})
export { router as locationRouter }