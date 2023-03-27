import { model, Schema, Document } from "mongoose"

export type LocationDocument = Document & {
    name: String
}

const schema: Schema = new Schema({ 
    name: {
        type: String,
        required: true
    }, 
}, { timestamps: true, versionKey: false })

export const Location = model<LocationDocument>('Location', schema)