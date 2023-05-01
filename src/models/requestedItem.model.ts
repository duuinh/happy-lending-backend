import { model, Schema, Document } from "mongoose"
import { RequestedItemStatusEnum } from '../constants';
import User from "./user.model"

export type RequestedItemDocument = Document & {
    name: string,
    borrower: string,
    status: string
}

const schema: Schema = new Schema({ 
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
        default: RequestedItemStatusEnum.open,
    },
    offers: {
        type: Array
    }
}, { timestamps: true, versionKey: false , collection: 'requested_items' })

schema.path('borrower').validate(async (value: string) => {
    return await User.findById(value);
  }, 'User does not exist');

const RequestedItem = model<RequestedItemDocument>('RequestedItem', schema)

export default RequestedItem