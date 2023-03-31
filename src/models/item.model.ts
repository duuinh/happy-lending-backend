import { model, Schema, Document } from "mongoose"
import { ItemStatusEnum } from "../constants"

export type ItemDocument = Document & {
    name: string,
    img_url: string,
    lender: string,
    status: string
}

const schema: Schema = new Schema({ 
    name: {
        type: String,
        required: true
    }, 
    img_url: {
        type: String,
        required: true
    },
    lender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        default: ItemStatusEnum.available,
    }
}, { timestamps: true, versionKey: false })

export const Item = model<ItemDocument>('Item', schema)