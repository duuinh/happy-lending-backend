import { model, Schema, Document } from "mongoose"

export type ItemDocument = Document & {
    name: String,
    img_url: String,
    lender: String,
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
        type: String,
        required: true
    }
}, { timestamps: true, versionKey: false })

export const Item = model<ItemDocument>('Item', schema)