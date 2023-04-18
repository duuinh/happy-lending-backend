import express from 'express'
import User, { UserDocument } from '../models/user.model'

const router = express.Router()

// // get all users
// router.get('/users', async (req, res) => {
//     try {
//         const allUsers: UserDocument[] | null = await User.find().populate('location').exec();
//         res.status(200).send(allUsers);
//     } catch (err) {
//         res.status(400).send(err);
//     }
// })

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

//get user by email
router.get('/users/find/:email', async (req, res) => {
    try {
        const { email } = req.params
        const user: UserDocument | null = await User.findOne({ email: email.toLowerCase() }).populate('location').exec();
        if (!user) {
            return res.status(404).json('User Not Found')
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
        const user = new User({...payload, email: payload.email.toLowerCase()})
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