import { model, Schema, Document } from "mongoose"

export type LocationDocument = Document & {
    name: string
}

const schema: Schema = new Schema({ 
    name: {
        type: String,
        required: true,
        unique : true
    }, 
}, { timestamps: true, versionKey: false })

export const Location = model<LocationDocument>('Location', schema)