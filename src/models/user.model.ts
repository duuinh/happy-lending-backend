import { model, Schema, Document } from "mongoose"

export type UserDocument = Document & {
    name: String,
    email: String,
    phone_no: String,
    location: String,
}

const schema: Schema = new Schema({ 
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    },
    phone_no: {
        type: String,
        required: true
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
}, { timestamps: true, versionKey: false })

const User = model<UserDocument>('User', schema)
export default User