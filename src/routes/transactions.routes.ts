import express from 'express'
import {Transaction} from '../models/transaction.model'
import socket from "../socket";

const router = express.Router()

//get all transaction
router.get('/transactions', async (req, res) => {
    Transaction.find().exec((err, data) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(data);
    });
})

//get transaction by borrower id
router.get('/transactions/borrower/:borrower_id', async (req, res) => {
    const { borrower_id } = req.params
    Transaction.find({ borrower: borrower_id }).exec((err, data) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(data);
    });
})

//get transaction by lender id
router.get('/transactions/lender/:lender_id', async (req, res) => {
    const { lender_id } = req.params
    Transaction.find({ lender: lender_id }).exec((err, data) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(data);
    });
})

//get sale amount by location id
// router.get('/transactions/location/:location_id/total', async (req, res) => {
//     const { location_id } = req.params
//     Transaction.aggregate([
//         { $match: { location: location_id } },
//         { $group: {
//             _id: "$location",
//             amount: { $sum: "$amount" },
//         }}])
//         .exec((err, data) => {
//             if (err) return res.status(400).send(err);
//             res.status(200).send(data[0]);
//         });
// })

//add transaction
router.post('/transactions', (req, res) =>{
    const payload = req.body
    const transaction = new Transaction(payload)
    transaction.save()

    const connection = socket.connection();
    if (connection.socket) {
        if (payload.payment_method === "Cash") {
        Transaction.aggregate([
            { $match: { location: payload.location } },
            { $group: {
                _id: "$location",
                collected_cash: { $sum: "$amount" },
            }}])
            .exec((err, data) => {
                console.log(data)
                let msg = { topic: 'UPDATE_CASH', location_id: data[0]._id, collected_cash: data[0].collected_cash}
                connection.emit("UPDATE_CASH", msg);
                console.log(msg)
            });
        }
        Transaction.aggregate([
            { $match: { location: payload.location } },
            { $group: {
                _id: "$location",
                sale: { $sum: "$amount" },
            }}])
            .exec((err, data) => {
                let msg = { topic: 'UPDATE_SALE', location_id: data[0]._id, sale: data[0].sale}
                connection.emit("UPDATE_SALE", msg);
                console.log(msg)
        });
    }
    res.status(201).send(transaction);
})

export { router as transactionRouter }