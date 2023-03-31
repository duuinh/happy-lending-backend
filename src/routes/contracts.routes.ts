import express from 'express'
import { ContractStatusEnum } from '../constants';
import { Contract } from '../models/contract.model'
import socket from "../socket";

const router = express.Router()

//get all contract
router.get('/contracts', async (req, res) => {
    try {
        Contract.find().exec((err, data) => {
            if (err) return res.status(400).send(err);
            res.status(200).send(data);
        });
    } catch (err) {
        res.status(400).send(err);
    }

})

//get contract by borrower id
router.get('/contracts/borrower/:borrower_id', async (req, res) => {
    try {
        const { borrower_id } = req.params
        Contract.find({ borrower: borrower_id }).exec((err, data) => {
            if (err) return res.status(400).send(err);
            res.status(200).send(data);
        });
    } catch (err) {
        res.status(400).send(err);
    }
})

//get contract by lender id
router.get('/contracts/lender/:lender_id', async (req, res) => {
    try {
        const { lender_id } = req.params
        Contract.find({ lender: lender_id }).exec((err, data) => {
            if (err) return res.status(400).send(err);
            res.status(200).send(data);
        });
    } catch (err) {
        res.status(400).send(err);
    }
})

//add contract
router.post('/contracts', (req, res) => {
    try {
        const payload = req.body
        const contract = new Contract(payload)
        contract.save()
        res.status(201).send(contract);
    } catch (err) {
        res.status(400).send(err);
    }

})

//request borrowing
router.post('/contracts/request_borrowing', (req, res) => {
    try {
        const payload = req.body
        const contract = new Contract(payload)
        contract.status = ContractStatusEnum.created;
        contract.save()
        res.status(201).send(contract);

    } catch (err) {
        res.status(400).send(err);
    }
})

//accept borrowing
router.put('/contracts/accept_borrowing/:id', (req, res) => {
    try {
        const { id } = req.params
        const payload = { status: ContractStatusEnum.accepted }
        Contract.findByIdAndUpdate(id, { $set: payload }).exec((err, data) => {
            if (err) return res.status(400).send(err);
            res.status(200).send(data);
        });
    } catch (err) {
        res.status(400).send(err);
    }
})

export { router as contractRouter }