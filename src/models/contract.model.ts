import { model, Schema, Document } from "mongoose"
import { ContractStatusEnum } from "../constants"

export type ContractDocument = Document & {
    item: string,
    lender: string,
    borrower: string,
    pick_up_date: Date,
    return_date: Date,
    status: string
}

const schema: Schema = new Schema({ 
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },  
    lender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    borrower: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
        default: ContractStatusEnum.requested
    }
}, { timestamps: true, versionKey: false })

export const Contract = model<ContractDocument>('Contract', schema)