import express from 'express'
import { getCombinedNodeFlags } from 'typescript';
import User, { UserDocument } from '../models/user.model'

const router = express.Router()

// get all users
router.get('/users', (req, res) => {
    try {
        User.find().populate('location').exec((err, data) => {
            if (err) return res.status(400).send(err);
            res.status(200).send(data);
        });
    } catch (err) {
        res.status(400).send(err);
    }

})

//get user by id
router.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params

        User.findById(id).populate('location').exec((err, data) => {
            if (err) return res.status(400).send(err);
            res.status(200).send(data);
        });
    } catch (err) {
        res.status(400).send(err);
    }
})

//easy login
router.post('/users/login', async (req, res) => {
    try {
        const payload = req.body

        const user: UserDocument | null = await User.findOne({ email: payload.email }).exec();
        if (!user || user.phone_no !== payload.phone_no) {
            return res.status(401).json('wrong email or phone no.');
        }
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
})

// update user
router.put('/users/:id', (req, res) => {
    try {
        const { id } = req.params
        const payload = req.body

        User.findByIdAndUpdate(id, { $set: payload }).exec((err, data) => {
            if (err) return res.status(400).send(err);
            res.status(200).send(data);
        });
    } catch (err) {
        res.status(400).send(err);
    }
})

//add user
router.post('/users', (req, res) => {
    try {
        const payload = req.body

        const user = new User(payload)
        user.save()
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
})

//delete user
router.delete('/users/:id', (req, res) => {
    try {
        const { id } = req.params

        User.deleteOne({ _id: id }).exec((err, data) => {
            if (err) return res.status(400).send(err);
            res.status(200).send(data);
        });

    } catch (err) {
        res.status(400).send(err);
    }
})
export { router as userRouter }