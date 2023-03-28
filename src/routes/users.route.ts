import express from 'express'
import User from '../models/user.model'

const router = express.Router()

// get all users
router.get('/users', (req, res) =>{
    User.find().exec((err, data) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(data);
    });
})

//get user by id
router.get('/users/:id', async (req, res) => {
    const { id } = req.params
    User.findById(id).exec((err, data) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(data);
    });
})

// update user
router.put('/users/:id', (req, res) =>{
    const { id } = req.params
    const payload = req.body
    User.findByIdAndUpdate(id, { $set: payload }).exec((err, data) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(data);
    });
})

//add user
router.post('/users', (req, res) =>{
    const payload = req.body
    const user = new User(payload)
    user.save()
    res.status(201).send(user);
})

export { router as userRouter }