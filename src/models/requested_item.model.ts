import { model, Schema, Document } from "mongoose"
import { RequestedItemStatusEnum } from '../constants';
// import { ItemStatusEnum } from "../constants"
import User from "./user.model"

export type RequestedItemDocument = Document & {
    item_id: string,
    name: string,
    borrower: string,
    status: string
}

const schema: Schema = new Schema({ 
    item_id: {
        type: String,
        required: true
    }, 
    name: {
        type: String,
        required: true
    },
    borrower: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        default: RequestedItemStatusEnum.available,
    }
}, { timestamps: true, versionKey: false })

schema.path('borrower').validate(async (value: string) => {
    return await User.findById(value);
  }, 'User does not exist');

const RequestedItem = model<RequestedItemDocument>('RequestedItem', schema)

export default RequestedItem