import { model, Schema, Document } from "mongoose"
import { ContractStatusEnum } from "../constants"
import Item from "./item.model"
import User from "./user.model"

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

schema.path('lender').validate(async (value: string) => {
    return await User.findById(value);
}, 'User does not exist');

schema.path('borrower').validate(async (value: string) => {
    return await User.findById(value);
}, 'User does not exist');

schema.path('item').validate(async (value: string) => {
    return await Item.findById(value);
}, 'Item does not exist');

const Contract = model<ContractDocument>('Contract', schema)

export default Contract