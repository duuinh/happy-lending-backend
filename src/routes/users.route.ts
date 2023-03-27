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

export { router as userRouter }