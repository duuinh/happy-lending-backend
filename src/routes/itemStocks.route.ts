// import express from 'express'
// import {ItemStock} from '../models/itemStock.model'
// import socket from "../socket";

// const router = express.Router()

// // get all
// router.get('/stocks', async (req, res) => {
//     ItemStock.find().populate('item').exec((err, data) => {
//         if (err) return res.status(400).send(err);
//         res.status(200).send(data);
//     });
// })

// // get stock by id
// router.get('/stocks/:id', async (req, res) => {
//     const { id } = req.params
//     ItemStock.findById(id).populate('item').exec((err, data) => {
//         if (err) return res.status(400).send(err);
//         res.status(200).send(data);
//     });
// })


// // get stocks by location_id
// router.get('/stocks/location/:location_id', async (req, res) => {
//     const { location_id } = req.params
//     ItemStock.find({ location_id: location_id }).populate('item').exec((err, data) => {
//         if (err) return res.status(400).send(err);
//         res.status(200).send(data);
//     });
// })

// // get total stocks by location_id
// router.get('/stocks/location/:location_id/total', async (req, res) => {
//     const { location_id } = req.params
//     ItemStock.aggregate([
//         { $match: { location_id: location_id } },
//         { $group: {
//             _id: "$location_id",
//             total: { $sum: "$qty" },
//         }}])
//         .exec((err, data) => {
//             if (err) return res.status(400).send(err);
//             res.status(200).send(data[0]);
//         });
// })

// // add stock
// router.post('/stocks', (req, res) =>{
//     const payload = req.body
//     const itemStock = new ItemStock(payload)
//     itemStock.save()
//     res.status(201).send(itemStock);
// })

// // update stock
// router.put('/stocks/:id', (req, res) =>{
//     const { id } = req.params
//     const payload = req.body
//     ItemStock.findByIdAndUpdate(id, { $set: payload }).exec((err, data) => {
//         if (err) return res.status(400).send(err);
//         if (payload.qty && data) {
//             ItemStock.aggregate([
//                 { $match: { location_id: data.location_id } },
//                 { $group: {
//                     _id: "$location_id",
//                     total: { $sum: "$qty" },
//                 }}])
//                 .exec((err, data) => {
//                     let stock = data[0].total
//                     const connection = socket.connection();
//                     if (connection.socket) {
//                         if (stock < 10) {    
//                             let msg = { topic: 'LOW_STOCK_ALERT', location_id: data[0]._id }
//                             connection.emit("LOW_STOCK_ALERT", msg);
//                             console.log(msg)
//                         }
//                             let msg = { topic: 'UPDATE_STOCK', location_id: data[0]._id, stock: stock}
//                             connection.emit("UPDATE_STOCK", msg);
//                             console.log(msg)
//                     }
//                 });
//         }
//         res.status(200).send(data);
//     });
// })

// export { router as itemStockRouter }