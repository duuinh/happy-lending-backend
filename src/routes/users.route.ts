import express from 'express'
import User, {UserDocument } from '../models/user.model'

const router = express.Router()

// get all users
router.get('/users', async (req, res) => {
    try {
        const allUsers: UserDocument[] | null = await User.find().populate('location').exec();
        res.status(200).send(allUsers);
    } catch (err) {
        res.status(400).send(err);
    }
})

//get user by id
router.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user: UserDocument | null = await User.findById(id).populate('location').exec();
        res.status(200).send(user);
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
router.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const payload = req.body
        const updatedUser: UserDocument | null = await User.findByIdAndUpdate(id, { $set: payload }).exec();
        res.status(200).send(updatedUser);
    } catch (err) {
        res.status(400).send(err);
    }
})

//add user
router.post('/users', async (req, res) => {
    try {
        const payload = req.body
        const user = new User(payload)
        await user.save()
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
})

// //delete user
// router.delete('/users/:id', async (req, res) => {
//     try {
//         const { id } = req.params
//         await User.deleteOne({ _id: id }).exec();
//         res.status(200).send('User deletion succeeded');
//     } catch (err) {
//         res.status(400).send(err);
//     }
// })
export { router as userRouter }
