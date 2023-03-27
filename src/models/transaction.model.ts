import { model, Schema, Document } from "mongoose"

export type TransactionDocument = Document & {
    item: String,
    lender: String,
    borrower: String,
    pick_up_date: Date,
    return_date: Date,
    status: String
}

const schema: Schema = new Schema({ 
    item: {
        type: String,
        required: true
    },  
    lender: {
        type: String,
        required: true
    },
    borrower: {
        type: String,
        required: true
    },
    pick_up_date: {
        type: Date,
        required: true
    },
    return_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, { timestamps: true, versionKey: false })

export const Transaction = model<TransactionDocument>('Transaction', schema)