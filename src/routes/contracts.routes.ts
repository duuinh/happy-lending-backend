import express from 'express'
import Contract, { ContractDocument } from '../models/contract.model'

const router = express.Router()

// //get all contract
// router.get('/contracts', async (req, res) => {
//     try {
//         const allContracts: ContractDocument[] | null = await Contract.find().exec();
//         res.status(200).send(allContracts);
//     } catch (err) {
//         res.status(400).send(err);
//     }

// })

//get contract by borrower id
router.get('/contracts/borrower/:borrower_id', async (req, res) => {
    try {
        const { borrower_id } = req.params
        const contractByBorrowerId: ContractDocument[] | null = await Contract.find({ borrower: borrower_id }).populate(['item','lender']).exec();
        res.status(200).send(contractByBorrowerId);
    } catch (err) {
        res.status(400).send(err);
    }
})

//get contract by lender id
router.get('/contracts/lender/:lender_id', async (req, res) => {
    try {
        const { lender_id } = req.params
        const contractByLenderId: ContractDocument[] | null = await Contract.find({ lender: lender_id }).populate(['item','borrower', 'lender']).exec();
        res.status(200).send(contractByLenderId);
    } catch (err) {
        res.status(400).send(err);
    }
})

//add contract
router.post('/contracts', async (req, res) => {
    try {
        const payload = req.body
        const contract = new Contract(payload)
        await contract.save()
        res.status(201).send(contract);
    } catch (err) {
        res.status(400).send(err);
    }

})

// update contract
router.put('/contracts/:id', async (req, res) => {
    try {
        const { id } = req.params
        const payload = req.body
        const contract: ContractDocument | null = await Contract.findByIdAndUpdate(id, { $set: payload }).exec();
        res.status(200).send(contract);
    } catch (err) {
        res.status(400).send(err);
    }
})

export { router as contractRouter }